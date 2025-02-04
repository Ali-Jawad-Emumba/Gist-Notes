import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gist-card',
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss',
})
export class GistCardComponent implements OnInit,  OnDestroy {
  @Input() publicGists$!: any;
  cards!: any;
  private subscription!: Subscription;
  @ViewChildren('jsonBlock') jsonBlocks!: QueryList<ElementRef>;

  jsonData = { name: 'Ali', age: 25, skills: ['Angular', 'React'] };

  ngOnInit(): void {
    this.subscription = this.publicGists$.subscribe(
      (val: any) =>
        (this.cards = val.map((e: any) => ({
          json: e.files.raw_url,
          avatar: e.owner.avatar_url,
          name: e.owner.login,
          gistName: Object.keys(e.files)[0],
          created: dayjs(e.created_at).fromNow(),
          description: e.description,
        })))
    );
  }


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
