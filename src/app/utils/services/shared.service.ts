import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  user: any = new BehaviorSubject<User | null>(null);
  openedGistCard: any = new BehaviorSubject(null);
  selectedGistView: any = new BehaviorSubject<string>('list');
  constructor() {}

}
