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
  @Input({ required: true }) cardWidth!: string;
  cards!: any;
  loading: boolean = false;

  constructor(
    private httpService: HttpService,
    public sharedService: SharedService,
    private router: Router
  ) {}
  jsonData = { name: 'Ali', age: 25, skills: ['Angular', 'React'] };

  openGistView(gistId: string) {
    this.sharedService.openedGistId.next(gistId);
    this.router.navigate([`/gist/${gistId}`]);
  }

  ngOnInit(): void {
    if (this.publicGists && this.publicGists.length > 0) {
      this.publicGists = this.publicGists.slice(0, 9);
      this.fetchCardDetails();
    }
  }
  async fetchCardDetails() {
    this.loading = true;
    const promises = this.publicGists.map(
      async (e: any) => await this.sharedService.fetchCardDetail(e)
    );

    const cardsData = await Promise.all(promises);

    this.loading = false;
    this.cards = cardsData;
  }
}
