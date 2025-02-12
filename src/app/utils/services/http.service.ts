import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private BASE_URL = 'https://api.github.com';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${import.meta.env.NG_APP_GITHUB_TOKEN}`,
  });
  constructor(private http: HttpClient) {}

  getPublicGists = () => this.http.get(`${this.BASE_URL}/gists/public`);
  getGistCodePreview = (url: string) =>
    this.http.get(url, { responseType: 'text' });

  getUserGists = (username: string) =>
    this.http.get(`${this.BASE_URL}/users/${username}/gists`, {
      headers: this.headers,
    });

  getUserStarredGists = () =>
    this.http.get(`${this.BASE_URL}/gists/starred`, { headers: this.headers });

  checkStar = (gistId: string) =>
    this.http.get(`${this.BASE_URL}/gists/${gistId}/star`, {
      headers: this.headers,
    });

  getUser = () =>
    this.http.get(`${this.BASE_URL}/user`, { headers: this.headers });
  postGist = (gist: any) =>
    this.http.post(`${this.BASE_URL}/gists`, gist, { headers: this.headers });

  forkGist = (body: any) =>
    this.http.post(`${this.BASE_URL}/gists/${body.gistId}/forks`, body, {
      headers: this.headers,
    });

  starGist = (body: any) =>
    this.http.put(`${this.BASE_URL}/gists/${body.gistId}/star`, body, {
      headers: this.headers,
    });

  getAGist = (gistId: string) =>
    this.http.get(`${this.BASE_URL}/gists/${gistId}`);

}
