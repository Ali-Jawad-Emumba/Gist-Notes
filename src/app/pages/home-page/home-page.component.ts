import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../utils/services/http.service';
import { GistsTableComponent } from '../../components/gists-table/gists-table.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  viewType: string = 'list';
  currentView: any = GistsTableComponent;
  dynamicInputs!: any;
  loading: boolean = false;
  subscription!: Subscription;
  publicGists!: any;

  constructor(private httpService: HttpService) {}

  selectView = (view: string) => {
    this.viewType = view;
  };

  ngOnInit(): void {
    this.subscription = this.httpService
      .getPublicGists()
      .subscribe((val: any) => (this.publicGists = val));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
