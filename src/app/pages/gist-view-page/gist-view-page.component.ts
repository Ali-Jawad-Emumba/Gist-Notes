import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';

@Component({
  selector: 'app-gist-view-page',
  templateUrl: './gist-view-page.component.html',
  styleUrl: './gist-view-page.component.scss',
})
export class GistViewPageComponent implements OnInit, OnDestroy {
  gist!: any;
  subcriptions!: Subscription[];

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    const gistGetSubscription = this.sharedService.openedGistId.subscribe(
      async (gistId: string) => {
        const gist = await this.httpService.getAGist(gistId).toPromise();
        this.gist = await this.sharedService.fetchCardDetail(gist);
      }
    );
    this.subcriptions.push(gistGetSubscription);
  }

  forkGist() {
    window.open(this.gist.forksURL, '_blank'); //fork gist api not working so i did this
  }

  starGist() {
    const body = { gistId: this.gist.gistId };
    const starGistSubscription = this.httpService
      .starGist(body)
      .subscribe(() => console.log('Gist Starred'));
    this.subcriptions.push(starGistSubscription);
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((subcription) => subcription.unsubscribe());
  }
}
