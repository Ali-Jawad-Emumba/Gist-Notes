import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../utils/services/http.service';
import { GistsTableComponent } from '../../components/gists-table/gists-table.component';
import { Subscription } from 'rxjs';
import { SharedService } from '../../utils/services/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  viewType: string = 'list';
  currentView: any = GistsTableComponent;
  dynamicInputs!: any;
  loading: boolean = true;
  subscription!: Subscription;
  publicGists!: any;

  constructor(
    private httpService: HttpService,
    private sharedService: SharedService
  ) {}

  selectView = (view: string) => {
    this.sharedService.selectedGistView.next(view);
  };

  async ngOnInit(): Promise<void> {
    const publicGist = await this.httpService.getPublicGists().toPromise();

    this.publicGists = publicGist;

    this.subscription = this.sharedService.selectedGistView.subscribe(
      (val: string) => (this.viewType = val)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
