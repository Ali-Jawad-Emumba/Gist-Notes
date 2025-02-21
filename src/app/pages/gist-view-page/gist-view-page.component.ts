import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-gist-view-page',
  templateUrl: './gist-view-page.component.html',
  styleUrl: './gist-view-page.component.scss',
})
export class GistViewPageComponent implements OnInit, OnDestroy {
  gist: WritableSignal<any> = signal(null);
  subcriptions: Subscription[] = [];
  openedGistId: WritableSignal<string> = signal('');

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const paramSubscription = this.route.params.subscribe(async (param) => {
      const openedGistId = param['id'];
      const gist = await this.httpService.getAGist(openedGistId).toPromise();
      this.gist.set(await this.sharedService.fetchCardDetail(gist));
    });
    this.subcriptions.push(paramSubscription);
  }

  forkGist() {
    const forkGistSubscription = this.httpService
      .forkGist(this.gist().gistId)
      .subscribe(() => console.log('Gist Forked'));
    this.subcriptions.push(forkGistSubscription);
  }

  starGist() {
    const body = { gistId: this.gist().gistId };
    const starGistSubscription = this.httpService
      .starGist(body)
      .subscribe(() => console.log('Gist Starred'));
    this.subcriptions.push(starGistSubscription);
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((subcription) => subcription.unsubscribe());
  }
}
