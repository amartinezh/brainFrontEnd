import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Adult } from 'src/app/interfaces/adult';
import { Exercise } from 'src/app/interfaces/exercise';
import { DataService } from 'src/app/services/data.service';
import { AdultService } from 'src/app/services/adult.service';
import { WorkSession } from '../../interfaces/workSession';

import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserData } from '../../services/user-data';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.page.html',
  styleUrls: ['./create-session.page.scss'],
})
export class CreateSessionPage implements OnInit {

  location = 'madison';
  exercises: Observable<Exercise[]>;
  // adults: Observable<Adult[]>;
  adults: Adult[] = [];
  adultsDB:  any;
  eValues: Exercise[];
  aValues: Adult[];
  user: any;
  workSession: WorkSession;
  sessionId: number = 0;

  constructor( private dataService: DataService, private storage: Storage, private alertCtrl: AlertController, private router: Router,  private userData: UserData, private adultData: AdultService) { }

  async ngOnInit() {
    this.exercises = this.dataService.getExercises();
    // this.adults = this.dataService.getAdults();
    this.loadAdults();
    this.loadAdultsDB();

    await this.storage.create();

  }

  loadAdults(){
    this.dataService.getAdultsStorage().then((adults)=>{
      this.adults=adults;
      console.log('Se cargaron correctamente todos ', this.adults);
    });
  }


  async loadAdultsDB() {
    let err: boolean = false;
    try {
      let value = await this.adultData.getAdults();
      console.log(value);
      this.adultsDB = value;
      console.log("Este es AdultsDB ", this.adultsDB);
      if (value == null) {
        err = true;

        console.log('No se encontraron adultos para cargar');
      } else {

        console.log('Se cargaron correctamente');
        
      }
    } catch (error) {
      console.log('Hubo un error trayendo los adultos: ');
      console.log(error);
    }

  }

  compareWith(o1: Exercise, o2: Exercise | Exercise[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Exercise) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }

  async submit(){
    console.log("submitted");
    var date = new Date();

    await this.storage.set('workSession', {'id':this.sessionId,'exercises':this.eValues,'adult':this.aValues,'date':date});
    this.sessionId++;
    const auxiliar = await this.storage.get('workSession');
    console.log(auxiliar);

    this.presentAlertConfirm();
  }

  exercisesValue(event: Event){
    // console.log(event.detail.value);
    this.eValues = (event as CustomEvent).detail.value;
    console.log(this.eValues);
  }

  adultValue(event: Event){
    // console.log(event.detail.value);
    this.aValues = (event as CustomEvent).detail.value;
    console.log(this.aValues);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¡Sesión!',
      message: '¿Desea iniciar la sesión de trabajo?',
      buttons: [
        {
          text: 'Más tarde.',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigateByUrl('/home');
          }
        }, {
          text: 'Si.',
          handler: () => {
            this.router.navigateByUrl('/exercise');
          }
        }
      ]
    });

    await alert.present();
  }

}
