import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private BASE_URL = 'https://api.github.com';
  private skipAuthHeaders = new HttpHeaders({
    skipAuth: '',
  }); //for endpoints which dont need authorization meant to handle authorization at interceptor
  constructor(private http: HttpClient) {}

  getPublicGists = () =>
    this.http.get(`${this.BASE_URL}/gists/public`, {
      headers: this.skipAuthHeaders,
    });
  getGistCodePreview = (url: string) =>
    this.http.get(url, { responseType: 'text', headers: this.skipAuthHeaders });

  getUserGists = (username: string) =>
    this.http.get(`${this.BASE_URL}/users/${username}/gists`);

  getUserStarredGists = () => this.http.get(`${this.BASE_URL}/gists/starred`);

  checkStar = (gistId: string) =>
    this.http.get(`${this.BASE_URL}/gists/${gistId}/star`);

  getUser = () => this.http.get(`${this.BASE_URL}/user`);
  postGist = (gist: any) => this.http.post(`${this.BASE_URL}/gists`, gist);

  forkGist = (gistId: any) =>
    this.http.post(`${this.BASE_URL}/gists/${gistId}/forks`, {gist_id: 'GIST_ID'});

  starGist = (body: any) =>
    this.http.put(`${this.BASE_URL}/gists/${body.gistId}/star`, body);

  getAGist = (gistId: string) =>
    this.http.get(`${this.BASE_URL}/gists/${gistId}`, {
      headers: this.skipAuthHeaders,
    });
}
