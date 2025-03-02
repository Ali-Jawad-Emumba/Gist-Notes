import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../utils/services/shared.service';
import { HttpService } from '../../utils/services/http.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserData } from '../../utils/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})


export class NavbarComponent implements OnInit, OnDestroy {
  user: UserData |null = null;
  private auth!: any;
  showMenu: boolean = false;
  searchedId: string = ''; //for the search bar
  subscription!: Subscription;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  search(event: Event) {
    const val = event.target as HTMLInputElement;
    this.searchedId = val.value;
    this.router.navigate([`/gist/${this.searchedId}`]);
  }

  toggleShowMenu() {
    this.showMenu = !this.showMenu;
  }
  goToGithubProfile() {
    window.open(`https://github.com/${this.user?.name}`, '_blank');
  }
  setupUser(user: any) {
    this.user = {
      name: user.reloadUserInfo.screenName,
      image: user.photoURL,
    };
    this.sharedService.user$.next(this.user);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (
      (!target.closest('.menu') && !target.closest('.user-avatar')) ||
      target.closest('.menu li')
    ) {
      this.showMenu = false;
    }
  }
  ngOnInit(): void {
    this.auth = getAuth(initializeApp(environment.firebaseConfig));
    this.auth.onAuthStateChanged((user: any) => {
      this.setupUser(user);
    });
  }

  signInWithGitHub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result.user);
        this.setupUser(result.user);
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  }

  signOut() {
  
this.router.navigate(['/'])
    signOut(this.auth).then(() => {
      this.user = null;
      console.log('User signed out');
      this.sharedService.user$.next(null);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
