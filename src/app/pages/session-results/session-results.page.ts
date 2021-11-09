import { Component, OnInit } from '@angular/core';
import { AdultService } from '../../services/adult.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
import { Adult } from '../../interfaces/adult';
import { User } from '../../interfaces/user';
import { Storage } from '@ionic/storage';
import { Exercise } from '../../interfaces/exercise';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SessionService } from '../../services/session.service';
import { Session } from '../../interfaces/workSession';

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
  session: Session;


  constructor(private adultService: AdultService, private userService: UserService, private userData: UserData,private toastController: ToastController, public router: Router, private storage: Storage, private sessionService: SessionService) { }

  ngOnInit() {
    this.session={id_user:"", id_adult:"", correct:0, wrong:0, date:"", observations:"", exercises:""};
  }

  async ngAfterViewInit() {
    
    
    await this.getData();
    let correct = 0, wrong = 0, exercises = "";

    for (let i = 0; i < this.results.length; i++) {
      if(this.results[i]=="Correct"){
        correct++;
      } else {
        wrong++;
      }
    }

    for (let i = 0; i < this.exercises.length; i++) {
      if(i<this.exercises.length-1){
        exercises=exercises+this.exercises[i].exerciseNumber.slice(10)+", ";
      } else {
        exercises=exercises+this.exercises[i].exerciseNumber.slice(10);
      }
    }
    
    this.session.id_user=this.user.id;
    this.session.id_adult=this.adult.id;
    this.session.correct=correct;
    this.session.wrong=wrong;
    this.session.date=""+this.date.getFullYear()+"-"+this.date.getMonth()+"-"+this.date.getDate();
    this.session.exercises=exercises;

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
    console.log("Id Usuario: "+this.user.id);

    this.loaded = true;

  }

  async onClick(){
    console.log("Sesion guardada.");
    console.log(this.session.observations);
    //this.router.navigateByUrl('/home');
  }


  async onSignup() {
    let err: boolean = false;
    try {
      await this.sessionService.insertSession(this.session);
      this.presentToast("La sesion ha sido guardada exitosamente.", "success");
    } catch (error) {
      console.log('Al parecer hubo un error al insertar la sesion en la Base de Datos.');
      console.log(error);
    }
    this.router.navigateByUrl('/home');

  }

  async presentToast(msg: string, clr: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: clr,
      duration: 2000
    });
    toast.present();
  }


}
