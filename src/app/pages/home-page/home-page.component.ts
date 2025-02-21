import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
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
  viewType: WritableSignal<string> = signal('list');
  subscription!: Subscription;
  publicGists: WritableSignal<any> = signal(null);

  constructor(
    private httpService: HttpService,
    private sharedService: SharedService
  ) {}

  selectView = (view: string) => {
    this.sharedService.selectedGistView.next(view);
  };

  async ngOnInit(): Promise<void> {
    const publicGist = await this.httpService.getPublicGists().toPromise();

    this.publicGists.set(publicGist);

    this.subscription = this.sharedService.selectedGistView.subscribe(
      (val: string) => this.viewType.set(val)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
