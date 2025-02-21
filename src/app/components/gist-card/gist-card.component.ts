import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import dayjs from 'dayjs';
import { HttpService } from '../../utils/services/http.service';
import { Router } from '@angular/router';
import { SharedService } from '../../utils/services/shared.service';
import { PageEvent } from '@angular/material/paginator';
import { card } from '../../utils/interfaces';

@Component({
  selector: 'app-gist-card',
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss',
})
export class GistCardComponent implements OnInit {
  @Input({ required: true }) publicGists!: any;
  @Input({ required: true }) cardWidth!: string;
  cards: WritableSignal<card[]> = signal([]);
  loading: WritableSignal<boolean> = signal(false);
  totalItems: WritableSignal<number> = signal(0); // Total items for pagination (for example)
  pageSize: number = 6; // Default items per page
  pagedData: WritableSignal<any[]> = signal([]); // Data to display on the current page

  constructor(
    private httpService: HttpService,
    public sharedService: SharedService,
    private router: Router
  ) {}
  jsonData = { name: 'Ali', age: 25, skills: ['Angular', 'React'] };

  openGistView(gistId: string) {
    this.router.navigate([`/gist/${gistId}`]);
  }

  ngOnInit(): void {
    if (this.publicGists && this.publicGists.length > 0) {
      this.totalItems.set(this.publicGists.length);
      this.loadPageData();
      this.fetchCardDetails();
    }
  }
  loadPageData() {
    this.pagedData.set(this.publicGists.slice(0, this.pageSize));
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData.set(this.publicGists.slice(startIndex, endIndex)); // Update data on page change
    this.fetchCardDetails();
  }
  async fetchCardDetails() {
    this.loading.set(true);
    const promises = this.pagedData().map(
      async (e: any) => await this.sharedService.fetchCardDetail(e)
    );

    const cardsData = await Promise.all(promises);

    this.loading.set(false);
    this.cards.set(cardsData);
  }
}
