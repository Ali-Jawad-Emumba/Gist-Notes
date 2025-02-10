import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { HttpService } from '../../utils/services/http.service';
import { Router } from '@angular/router';
import { SharedService } from '../../utils/services/shared.service';

@Component({
  selector: 'app-gist-card',
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss',
})
export class GistCardComponent implements OnInit {
  @Input({ required: true }) publicGists!: any;
  cards!: any;
  loading: boolean = true;

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
    if (this.publicGists) {
      this.publicGists = this.publicGists.slice(0, 9);
      this.fetchCardDetails();
    }
  }
  async fetchCardDetails() {
    this.loading = true;
    const promises = this.publicGists.map(async (e: any) => {
      let jsonData: any = null;
      let gistName = Object.keys(e.files)[0];

      const json = await this.httpService
        .getGistCodePreview(e.files[gistName].raw_url)
        .toPromise();
      jsonData = json;

      return {
        json: jsonData,
        avatar: e.owner.avatar_url,
        name: e.owner.login,
        gistName,
        created: dayjs(e.created_at).fromNow(),
        description: e.description,
      };
    });

    const cardsData = await Promise.all(promises);
    if (cardsData) {
      this.loading = false;
      this.cards = cardsData;
    }
  }
}
