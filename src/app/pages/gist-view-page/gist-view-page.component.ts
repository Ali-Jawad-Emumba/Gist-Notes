import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { firstValueFrom, Subject, Subscription, takeUntil } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-gist-view-page',
  templateUrl: './gist-view-page.component.html',
  styleUrl: './gist-view-page.component.scss',
})
export class GistViewPageComponent implements OnInit, OnDestroy {
  //this page routes when user opens an individual gist
  gist!: any;
  openedGistId!: string;
  private destroy$ = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (param) => {
        //get gist id from params and fetch it all detauls for view
        const openedGistId = param['id'];
        const gist = await firstValueFrom(
          this.httpService.getAGist(openedGistId)
        ); //fetches raw gist
        this.gist = await this.sharedService.fetchCardDetail(gist); //fetches code preview and transfrom raw data
      });
  }

  forkGist() {
    this.httpService
      .forkGist(this.gist.gistId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('Gist Forked'));
  }

  starGist() {
    const body = { gistId: this.gist.gistId };
    this.httpService
      .starGist(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => console.log('Gist Starred'));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
