import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserData } from './services/user-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  loggedIn = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private userData: UserData
  ) { }

  async ngOnInit() {
  }
}
