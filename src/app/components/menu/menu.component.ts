import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MenuItem } from '../../interfaces/menuItem';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  menuItem: Observable<MenuItem[]>;
  loggedIn = false;
  dark = false;

  constructor( private dataService: DataService, private storage: Storage, private userData: UserData, private router: Router) { }

  async ngOnInit() {
    this.menuItem = this.dataService.getMenuItems();
    await this.storage.create();
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
    this.updateLoggedInStatus;
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
