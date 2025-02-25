import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  cards!: card[];
  loading: boolean = false;
  totalItems!: number;
  pageSize: number = 6; 
  pagedData: any[] = []; 

  constructor(
    public sharedService: SharedService,
    private router: Router
  ) {}
  jsonData = { name: 'Ali', age: 25, skills: ['Angular', 'React'] };

  openGistView(gistId: string) {
    this.router.navigate([`/gist/${gistId}`]);
  }

  ngOnInit(): void {
    if (this.publicGists && this.publicGists.length > 0) {
      this.totalItems = this.publicGists.length;
      this.loadPageData();
      this.fetchCardDetails();
    }
  }
  loadPageData() {
    this.pagedData = this.publicGists.slice(0, this.pageSize);
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.publicGists.slice(startIndex, endIndex); // Update data on page change
    this.fetchCardDetails();
  }
  async fetchCardDetails() {
    this.loading = true;
    const promises = this.pagedData.map(
      async (e: any) => await this.sharedService.fetchCardDetail(e)
    );

    const cardsData = await Promise.all(promises);

    this.loading = false;
    this.cards = cardsData;
  }
}
