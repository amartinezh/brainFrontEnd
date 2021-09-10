import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserData } from './services/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loggedIn = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private userData: UserData
  ) {}

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/');
    });
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(false);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

}
