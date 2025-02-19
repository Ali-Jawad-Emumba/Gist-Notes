import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})


export class SharedService {
  user: any = new BehaviorSubject<User | null>(null);
  openedGistId: any = new BehaviorSubject(null);
  selectedGistView: any = new BehaviorSubject<string>('list');

  constructor(private httpService: HttpService) {}
  fetchCardDetail = async (gist: any) => {
    let jsonData: any = null;
    let gistName = Object.keys(gist.files)[0];

    const json = await this.httpService
      .getGistCodePreview(gist.files[gistName].raw_url)
      .toPromise();
    jsonData = json;
    return {
      json: jsonData,
      avatar: gist.owner.avatar_url,
      name: gist.owner.login,
      gistName,
      created: dayjs(gist.created_at).fromNow(),
      description: gist.description,
      gistId: gist.id,
      forksURL: gist.forks_url,
    };
  };
}
