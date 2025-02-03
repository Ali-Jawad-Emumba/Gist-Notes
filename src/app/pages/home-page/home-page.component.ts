import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Observable, Subscription } from 'rxjs';
import { TableColumns } from '../../utils/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  viewType: string = 'list';
  publicGists$!: any;
  subscription!: Subscription;
  tableData!: TableColumns[];

  constructor(private httpService: HttpService) {}

  selectView = (view: string) => {
    this.viewType = view;
  };

  ngOnInit(): void {
    this.publicGists$ = this.httpService.getPublicGists();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
