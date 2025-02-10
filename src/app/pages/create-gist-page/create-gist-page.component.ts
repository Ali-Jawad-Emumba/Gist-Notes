import {
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as ace from 'ace-builds'; // Import Ace Editor
import 'ace-builds/src-noconflict/mode-javascript'; // Import mode for JavaScript (or any other language)
import 'ace-builds/src-noconflict/theme-chrome'; // Import theme (optional)

@Component({
  selector: 'app-create-gist-page',
  templateUrl: './create-gist-page.component.html',
  styleUrls: ['./create-gist-page.component.scss'],
})
export class CreateGistPageComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder) {}

  gistForm!: FormGroup;
  private editors: ace.Ace.Editor[] = [];

  @ViewChildren('editor') private editorElements!: ElementRef[]; // Reference to the DOM element

  ngOnInit(): void {
    this.gistForm = this.fb.group({
      description: ['', Validators.required],
      files: this.fb.array([this.createNewFile()]),
    });
  }

  ngAfterViewInit(): void {
    this.initializeEditors(); // Initialize editors after the view is rendered
  }

  get files(): FormArray {
    return this.gistForm.get('files') as FormArray;
  }

  createNewFile = () =>
    this.fb.group({
      filename: ['', Validators.required],
      content: ['', Validators.required], // Binding the content to the FormControl
    });

  addFile = () => {
    this.files.push(this.createNewFile());
    setTimeout(() => this.initializeEditors()); // Reinitialize editors after file is added
  };

  deleteFile = (index: number) => {
    this.files.removeAt(index);
    this.destroyEditor(index); // Clean up editor on file removal
  };

  onSubmit = () => {
    console.log(this.gistForm.value);
  };

  showDeleteIcon = (index: number) =>
    index !== 0 && this.files.controls[index].get('filename')?.value;

  private initializeEditors(): void {
    // Set up Ace Editor for each file
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.5.3/src-noconflict'
    );

    // Clean up previous editors
    this.editors.forEach((editor) => editor.destroy());
    this.editors = [];

    // Initialize a new editor for each file
    Array.from(this.editorElements).forEach((element, index) => {
      const editor = ace.edit(element.nativeElement);
      editor.setTheme('ace/theme/chrome');
      editor.session.setMode('ace/mode/text');

      // Get the form control for this file
      const contentControl = this.files.at(index).get('content') as FormControl;

      // Set initial content from form control
      editor.setValue(contentControl.value || '');

      // Update the form control when content changes
      editor.on('change', () => {
        contentControl.setValue(editor.getValue());
      });

      this.editors.push(editor);
    });
  }

  private destroyEditor(index: number): void {
    if (this.editors[index]) {
      this.editors[index].destroy();
      this.editors.splice(index, 1); // Remove the destroyed editor
    }
  }
}
