import { Component, OnInit } from '@angular/core';
import { AdultService } from '../../services/adult.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
import { Adult } from '../../interfaces/adult';
import { User } from '../../interfaces/user';
import { Storage } from '@ionic/storage';
import { Exercise } from '../../interfaces/exercise';

@Component({
  selector: 'app-session-results',
  templateUrl: './session-results.page.html',
  styleUrls: ['./session-results.page.scss'],
})
export class SessionResultsPage implements OnInit {

  location = 'madison';
  adult: Adult;
  user: User;
  date: Date;
  exercises: Exercise[];
  sessionId: number;
  results: string[];
  loaded: boolean;


  constructor(private adultService: AdultService, private userService: UserService, private userData: UserData, public router: Router, private storage: Storage) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.getData();
  }

  async getData(){
    const auxiliar = await this.storage.get('workSession');
    console.log(auxiliar);

    this.user = auxiliar.user;
    this.adult = auxiliar.adult;
    this.date = auxiliar.date;
    this.exercises = auxiliar.exercises;
    this.sessionId = auxiliar.id;
    this.results = auxiliar.results;

    console.log("ejercicios: "+this.exercises);
    console.log("resultados: "+this.results);

    this.loaded = true;

  }

  async onClick(){
    console.log("Sesion guardada.");

    this.router.navigateByUrl('/home');
  }


}
