import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-gists-page',
  templateUrl: './user-gists-page.component.html',
  styleUrl: './user-gists-page.component.scss',
})
export class UserGistsPageComponent implements OnInit, OnDestroy {
  user: WritableSignal<any> = signal(null);
  subscriptions: Subscription[] = [];
  gists: WritableSignal<any> = signal(null);
  params: WritableSignal<string> = signal('');
  gistsHeading: WritableSignal<string> = signal('');

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const paramsSubscription = this.route.params.subscribe((params: any) => {
      this.params.set(params.type);
      this.gistsHeading.set(
        params.type === 'starred' ? 'Starred Gists' : 'All Gists'
      );
    });
    const userSubscription = this.sharedService.user.subscribe((user: any) => {
      this.user.set(user);
      const getUserData = () =>
        this.params() && this.params() == 'starred'
          ? this.httpService.getUserStarredGists()
          : this.httpService.getUserGists(user.name);
      const gistSubscription = getUserData().subscribe((gists) => {
        console.log(gists);
        this.gists.set(gists);
      });

      // const userGistsSubscription = this.httpService.getUserGists(this.user).subscribe;
      this.subscriptions.push(gistSubscription);
    });
    this.subscriptions.push(userSubscription, paramsSubscription);
  }
  goToGithubProfile() {
    window.open(`https://github.com/${this.user().name}`, '_blank');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
