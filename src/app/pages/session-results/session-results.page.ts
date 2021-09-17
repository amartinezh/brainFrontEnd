import { Component, OnInit } from '@angular/core';
import { AdultService } from '../../services/adult.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
import { Adult } from '../../interfaces/adult';
import { User } from '../../interfaces/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-session-results',
  templateUrl: './session-results.page.html',
  styleUrls: ['./session-results.page.scss'],
})
export class SessionResultsPage implements OnInit {

  location = 'madison';
  adult: Adult;
  user: User;


  constructor(private adultService: AdultService, private userService: UserService, private userData: UserData, public router: Router, private storage: Storage) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser(){
    const auxiliar = await this.storage.get('workSession');
    console.log(auxiliar);
  }


}
