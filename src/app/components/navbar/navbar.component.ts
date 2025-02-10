import { Component, HostListener } from '@angular/core';
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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: any = null;
  private auth!: any;
  showMenu: boolean = false;
  constructor(
    private sharedService: SharedService,
    private httpService: HttpService
  ) {}

  toggleShowMenu() {
    this.showMenu = !this.showMenu;
  }
  goToGithubProfile(){
    window.open(`https://github.com/${this.user.login}`, "_blank")
  }
  setupUser() {
    const subscription = this.httpService
      .getUser()
      .subscribe((loggedInUser) => {
        this.user = loggedInUser;
        this.sharedService.user.next(loggedInUser);
      }); //separate as this API provide proper user data
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.menu') && !target.closest('.user-avatar')) {
      this.showMenu = false;
    }

    if (target.closest('.menu li')) {
      this.showMenu = false;
    }
  }
  ngOnInit(): void {
    this.auth = getAuth(initializeApp(environment.firebaseConfig));
    this.auth.onAuthStateChanged(() => {
      this.setupUser();
    });
  }

  signInWithGitHub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result.user);
        this.setupUser();
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  }

  signOut() {
    signOut(this.auth).then(() => {
      this.user = null;
      console.log('User signed out');
    });
  }
}
