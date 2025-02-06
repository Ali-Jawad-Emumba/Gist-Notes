import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../utils/services/http.service';
import { GistsTableComponent } from '../../components/gists-table/gists-table.component';
import { GistCardComponent } from '../../components/gist-card/gist-card.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  viewType: string = 'list';
  publicGists$!: any;
  currentView: any = GistsTableComponent;
  dynamicInputs!: any;
  loading: boolean = false;

  constructor(private httpService: HttpService) {}

  selectView = (view: string) => {
    this.viewType = view;
    this.loading = true;
    switch (view) {
      case 'list':
        this.loading = false;
        this.currentView = GistsTableComponent;
        break;
      case 'card':
        this.loading = false;
        this.currentView = GistCardComponent;
        break;
    }
  };

  ngOnInit(): void {
    this.selectView('list');
    this.publicGists$ = this.httpService.getPublicGists();
    this.dynamicInputs = {
      publicGists$: this.publicGists$,
    };
  }

  ngOnDestroy(): void {}
}
