import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../utils/services/http.service';

@Component({
  selector: 'app-gist-view-page',
  templateUrl: './gist-view-page.component.html',
  styleUrl: './gist-view-page.component.scss',
})
export class GistViewPageComponent implements OnInit {
  gist!: any;
  subcription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.subcription = this.sharedService.openedGistCard.subscribe(
      (gist: any) => (this.gist = gist)
    );
  }

  forkGist() {
    window.open(this.gist.forksURL, '_blank');
  }

  starGist() {
    const body = { gistId: this.gist.gistId };
    this.httpService
      .starGist(body)
      .subscribe(() => console.log('Gist Starred'));
  }
}
