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
import { SessionExercise } from '../../interfaces/sessionExercise';
import { ExerciseMedia } from 'src/app/interfaces/exerciseMedia';


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
  sessionId: any;
  results: string[];
  loaded: boolean;
  session: Session;
  exerciseObservations: string;
  exercisesId: any[]=[];
  sessionExercise: SessionExercise;
  mediaObservations: string;
  exerciseMedia: ExerciseMedia;

  constructor(private adultService: AdultService, private userService: UserService, private userData: UserData,private toastController: ToastController, public router: Router, private storage: Storage, private sessionService: SessionService) { }

  ngOnInit() {
    this.session={id_user:"", id_adult:"", date:"", observations:"", exercises:[], exerciseObservations:""};
    this.sessionExercise={id_session:"", id_exercise:[], correct:[], observations:""};
    this.exerciseMedia={id_session:"", id_media:"", id_exercise:[], observation:""};
  }

  async ngAfterViewInit() {


    await this.getData();

    this.session.id_user=this.user.id;
    this.session.id_adult=this.adult.id;
    this.session.date=""+this.date.getFullYear()+"-"+this.date.getMonth()+"-"+this.date.getDate();
    this.session.exercises=this.exercises;
    this.session.exerciseObservations=this.exerciseObservations;

  }

  async getData(){
    const auxiliar = await this.storage.get('workSession');
    //console.log(auxiliar);

    this.user = auxiliar.user;
    this.adult = auxiliar.adult;
    this.date = auxiliar.date;
    this.exercises = auxiliar.exercises;
    //this.sessionId = auxiliar.id;
    this.results = auxiliar.results;
    this.exerciseObservations = auxiliar.exerciseObservations;

    const aux = await this.storage.get('MediaObservations');
    this.mediaObservations = aux;

    console.log("Media Observations",this.mediaObservations);

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
      // await this.sessionService.insertSession(this.session);
      // this.sessionId = await this.sessionService.getSessionId(this.session);

      // for (let i = 0; i < this.exercises.length; i++) {
      //   this.exercisesId[i] = this.exercises[i].id;
      // }

      // this.sessionExercise.id_session = this.sessionId['id'];
      // this.sessionExercise.id_exercise = this.exercisesId;
      // this.sessionExercise.correct = this.results;
      // this.sessionExercise.observations = this.exerciseObservations;

      // this.exerciseMedia.id_session = this.sessionExercise.id_session;
      
      
      // let cont = 0;
      // for (let i = 0; i < this.exercises.length; i++) {
      //   for(let j = 0 ; j<this.mediaObservations[i].length; j++){
          
      //     this.exerciseMedia.id_exercise = this.exercisesId[i];
      //     this.exerciseMedia.observation=this.mediaObservations[i][j];
      //     this.exerciseMedia.id_media=cont.toString();

      //     await this.sessionService.insertExerciseMedia(this.exerciseMedia);

      //     cont++;
      //   }
        
      // }

      // console.log(this.sessionExercise);

      // await this.sessionService.insertSessionExercise(this.sessionExercise);
      this.presentToast("La sesion ha sido guardada exitosamente.", "success");

    } catch (error) {
      console.log('Al parecer hubo un error al insertar la sesion en la Base de Datos.');
      console.log(error);
      this.router.navigateByUrl('/home');
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
