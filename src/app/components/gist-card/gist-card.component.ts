import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';
import { Router } from '@angular/router';
import { SharedService } from '../../utils/services/shared.service';

@Component({
  selector: 'app-gist-card',
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss',
})
export class GistCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) publicGists!: any;
  cards!: any;
  private subscription!: Subscription;
  private subSubscriptions: Subscription[] = [];

  constructor(
    private httpService: HttpService,
    public sharedService: SharedService,
    private router: Router
  ) {}
  jsonData = { name: 'Ali', age: 25, skills: ['Angular', 'React'] };

  openGistView(card: any) {
    this.sharedService.openedGistCard.next(card);
    this.router.navigate([`/gist/${card.name}`]);
  }
  
  ngOnInit(): void {
    if (this.publicGists)
      this.cards = this.publicGists.map((e: any) => {
        let jsonData;
        let gistName = Object.keys(e.files)[0];
        const subscription = this.httpService
          .getGistCodePreview(e.files[gistName].raw_url)
          .subscribe((json) => {
            console.log(json);
            jsonData = json;
          });
        this.subSubscriptions.push(subscription);
        return {
          json: jsonData,
          avatar: e.owner.avatar_url,
          name: e.owner.login,
          gistName,
          created: dayjs(e.created_at).fromNow(),
          description: e.description,
        };
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
