import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  user: any = new BehaviorSubject<User | null>(null);

  constructor() {}
}
