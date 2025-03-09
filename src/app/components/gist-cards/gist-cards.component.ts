import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../utils/services/shared.service';
import { PageEvent } from '@angular/material/paginator';
import { Card } from '../../utils/interfaces';

@Component({
  selector: 'app-gist-cards',
  templateUrl: './gist-cards.component.html',
  styleUrl: './gist-cards.component.scss',
})

//component meant to take gists as input and display them as cards
export class GistCardsComponent implements OnInit {
  @Input({ required: true }) publicGists!: any;
  @Input({ required: true }) cardWidth!: string;
  cards!: Card[]; //hold the gist cards to be displayed per pagination
  loading: boolean = false;

  //These are to support pagination
  totalItems!: number; //total number of cards
  pageSize: number = 6;
  pagedData: any[] = []; //hold raw gist data as per pagination

  constructor(public sharedService: SharedService, private router: Router) {}

  openGistView(gistId: string) {
    this.router.navigate([`/gist/${gistId}`]);
  }

  ngOnInit(): void {
    if (this.publicGists && this.publicGists.length > 0) {
      this.totalItems = this.publicGists.length;
      this.pagedData = this.publicGists.slice(0, this.pageSize); //slices data for first page
      this.loadCards();
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.publicGists.slice(startIndex, endIndex); // Update data on page change
    this.loadCards();
  }

  async loadCards() {
    this.loading = true;
    try {
      const cardsData = await Promise.all(
        this.pagedData.map((e) => this.sharedService.fetchCardDetail(e))
      );
      this.cards = cardsData;
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      this.loading = false;
    }
  }
}
