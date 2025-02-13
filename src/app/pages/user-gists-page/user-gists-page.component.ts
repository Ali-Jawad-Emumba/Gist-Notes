import { Component, OnDestroy, OnInit } from '@angular/core';
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
  user!: any;
  subscriptions: Subscription[] = [];
  gists!: any;
  params!: any;
  gistsHeading!: string;

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const paramsSubscription = this.route.params.subscribe((params: any) => {
      this.params = params.type;
      this.gistsHeading =
        params.type === 'starred' ? 'Starred Gists' : 'All Gists';
    });
    const userSubscription = this.sharedService.user.subscribe((user: any) => {
      this.user = user;
      const getUserData = () =>
        this.params && this.params == 'starred'
          ? this.httpService.getUserStarredGists()
          : this.httpService.getUserGists(user.name);
      const gistSubscription = getUserData().subscribe((gists) => {
        console.log(gists);
        this.gists = gists;
      });

      // const userGistsSubscription = this.httpService.getUserGists(this.user).subscribe;
      this.subscriptions.push(gistSubscription);
    });
    this.subscriptions.push(userSubscription, paramsSubscription);
  }
  goToGithubProfile() {
    window.open(`https://github.com/${this.user.name}`, '_blank');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
