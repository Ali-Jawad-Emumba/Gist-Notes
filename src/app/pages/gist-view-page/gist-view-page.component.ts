import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../utils/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gist-view-page',
  templateUrl: './gist-view-page.component.html',
  styleUrl: './gist-view-page.component.scss',
})
export class GistViewPageComponent implements OnInit {
  gist!: any;
  subcription!: Subscription;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.subcription = this.sharedService.openedGistCard.subscribe(
      (gist: any) => (this.gist = gist)
    );
  }
}
