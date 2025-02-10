import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';

@Component({
  selector: 'app-user-gists-page',
  templateUrl: './user-gists-page.component.html',
  styleUrl: './user-gists-page.component.scss',
})
export class UserGistsPageComponent implements OnInit {
  user!: any;
  subscriptions!: Subscription[];
  gists!: any;

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    const userSubscription = this.sharedService.user.subscribe((user: any) => {
      this.user = user;
      const gistSubscription = this.httpService
        .getUserGists(user.login)
        .subscribe((gists) => {
          console.log(gists);
          this.gists = gists;
        });

      // const userGistsSubscription = this.httpService.getUserGists(this.user).subscribe;
      this.subscriptions.push(gistSubscription);
    });
    this.subscriptions.push(userSubscription);
  }
  goToGithubProfile() {
    window.open(`https://github.com/${this.user.login}`, '_blank');
  }
}
