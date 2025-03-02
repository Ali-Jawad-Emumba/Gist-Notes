import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

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
    this.http
      .get(`${this.BASE_URL}/gists/public`, {
        headers: this.skipAuthHeaders,
      })
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  getGistCodePreview = (url: string) =>
    this.http
      .get(url, { responseType: 'text', headers: this.skipAuthHeaders })
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  getUserGists = (username: string) =>
    this.http
      .get(`${this.BASE_URL}/users/${username}/gists`)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  getUserStarredGists = () =>
    this.http
      .get(`${this.BASE_URL}/gists/starred`)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  checkStar = (gistId: string) =>
    this.http
      .get(`${this.BASE_URL}/gists/${gistId}/star`)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  getUser = () =>
    this.http
      .get(`${this.BASE_URL}/user`)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  postGist = (gist: any) =>
    this.http
      .post(`${this.BASE_URL}/gists`, gist)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  forkGist = (gistId: any) =>
    this.http
      .post(`${this.BASE_URL}/gists/${gistId}/forks`, {
        gist_id: 'GIST_ID',
      })
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  starGist = (body: any) =>
    this.http
      .put(`${this.BASE_URL}/gists/${body.gistId}/star`, body)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));

  getAGist = (gistId: string) =>
    this.http
      .get(`${this.BASE_URL}/gists/${gistId}`, {
        headers: this.skipAuthHeaders,
      })
      .pipe(catchError((error) => throwError(() => new Error(error.message))));
}
