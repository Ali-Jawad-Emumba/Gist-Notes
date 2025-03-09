import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-gists-page',
  templateUrl: './user-gists-page.component.html',
  styleUrl: './user-gists-page.component.scss',
})
export class UserGistsPageComponent implements OnInit, OnDestroy {
  user!: any;
  gists!: any;
  params!: any;
  gistsHeading!: string;
  private destroy$ = new Subject<void>();

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
        this.params = params.type;
        this.gistsHeading =
          params.type === 'starred' ? 'Starred Gists' : 'All Gists'; //checks which heading to use
      });
    this.sharedService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => {
        this.user = user;
        this.getUserData(user)
          .pipe(takeUntil(this.destroy$))
          .subscribe((gists) => (this.gists = gists));
      });
  }

  private getUserData = (user: any) =>
    this.params && this.params == 'starred'
      ? this.httpService.getUserStarredGists()
      : this.httpService.getUserGists(user.name); //uses different API calls incase of starred and all gists pages

  goToGithubProfile() {
    window.open(`https://github.com/${this.user.name}`, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
