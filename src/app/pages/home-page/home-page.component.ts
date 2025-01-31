import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  viewType: string = 'list';

  selectView = (view: string) => {
    this.viewType = view;
  };
}
