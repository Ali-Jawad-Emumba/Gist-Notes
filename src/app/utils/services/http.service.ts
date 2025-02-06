import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getPublicGists = () => this.http.get('https://api.github.com/gists/public');
  getGistCodePreview = (url: string) =>
    this.http.get(url, { responseType: 'text' });
}
