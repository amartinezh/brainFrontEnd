import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

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

  adultValues: Adult[] = [{
    id: "1",
    name:"Adulto 1",
    birth_date: "01/01/1950"       
},{
    id: "2",
    name:"Adulto 2",
    birth_date: "01/01/1950"       
},{
    id: "3",
    name:"Adulto 3",
    birth_date: "01/01/1950"       
},{
    id: "4",
    name:"Adulto 4",
    birth_date: "01/01/1950"       
},{
    id: "5",
    name:"Adulto 5",
    birth_date: "01/01/1950"       
},{
    id: "6",
    name:"Adulto 6",
    birth_date: "01/01/1950"       
},{
    id: "7",
    name:"Adulto 7",
    birth_date: "01/01/1950"       
},{
    id: "8",
    name:"Adulto 8",
    birth_date: "01/01/1950"       
},{
    id: "9",
    name:"Adulto 9",
    birth_date: "01/01/1950"       
},{
    id: "10",
    name:"Adulto 10",
    birth_date: "01/01/1950"       
},{
    id: "11",
    name:"Adulto 11",
    birth_date: "01/01/1950"       
},{
    id: "11",
    name:"Adulto 11",
    birth_date: "01/01/1950"       
},{
    id: "12",
    name:"Adulto 12",
    birth_date: "01/01/1950"       
},{
    id: "13",
    name:"Adulto 13",
    birth_date: "01/01/1950"       
},{
    id: "14",
    name:"Adulto 14",
    birth_date: "01/01/1950"       
},{
    id: "15",
    name:"Adulto 15",
    birth_date: "01/01/1950"       
}];

  exerValues: Exercise[] = [{  //machetazo
    exerciseNumber: "Ejercicio 1.1",
    icon: "./assets/img/brain2.png",
    title: "Evocación de acontecimientos autobiográficos por el uso de palabras claves.",
    description: "Con base en las preguntas que se ofrecen, responda:",
    module: "1",
    id: "1",
    media: ["¿Cuál es su fecha de nacimiento?","¿Cuál es el lugar donde pasó su infancia?","¿Quién era tu padre?","¿Quién era tu madre?","¿Cómo se llaman tus hermanos/as?","¿Cuál era la escuela a la que ibas?","¿Vivías en la ciudad o en el campo?","¿Cuál fue tu primer trabajo?","¿Cuál es la fecha de tu matrimonio?","¿En qué iglesia te casaste?","¿Quiénes son tus hijos?","¿Cuál es el viaje que más te ha gustado?","¿Cuál es el mayor logro de tu vida?","¿Cuántos nietos tienes?","¿Cómo se llaman tus nietos?","¿Cuál es tu lugar donde vives ahora?"],
    mediaType:"Questions"
  },{
    exerciseNumber: "Ejercicio 1.3",
    icon: "./assets/img/brain2.png",
    title: "Identificación de fechas importantes en el ciclo vital del participante usando palabras claves.",
    description: "Se le harán distintas preguntas relacionadas con su vida, por favor responda.",
    module: "1",
    id: "3",
    media: ["-¿Cuál fue el momento más difícil que vivió con su familia?","-¿Cuál fue el momento más feliz que vivió con su familia?","-¿Cuándo se le cayó el primer diente a su hijo?","-¿Cuándo conoció a su pareja?","-¿Cuánto tiempo llevan o llevaban juntos?","-¿Cuándo fue su boda?","-¿Cuándo fue su primer trabajo?","-¿A qué edad consiguió su primer trabajo?","-¿Cuántos trabajos realizo en su vida?","-¿Cuándo fue su último trabajo?","-¿Dónde creció?","-¿Qué recuerda de su niñez?","-¿Qué le gustaba cuando era pequeño?","-¿Qué no le gustaba cuando era pequeño?","-¿Qué extraña de cuando era pequeño?","-¿Qué quería ser cuando fuera grande?","-¿Qué es lo que primero que recuerda del estudio?","-¿Qué recuerda hacer en los recreos?","-¿Qué recuerda de sus profesores?","-¿Qué recuerda de sus compañeros?","-¿Anteriormente qué le gustaba hacer en su tiempo libre?","-¿Qué aromas y sabores le recuerda la comida?","-¿Cuál fue el momento que más satisfacción trajo a su vida?","-¿Cuál fue el momento que más desgracia trajo a su vida?","-¿Qué metas tenia?","-¿Pudo cumplir alguna de sus metas?","-¿Qué le hubiera gustado cambiar en su vida?"],
    mediaType:"Questions"
  },{
    exerciseNumber: "Ejercicio 1.6",
    icon: "./assets/img/brain2.png",
    title: "Recuerdo de los acontecimientos principales del año en curso.",
    description: "Se deben hacer preguntas sobre sucesos ocurridos durante el año actual y el adulto debe responder correctamente, por ejemplo.",
    module: "1",
    id: "6",
    media: ["¿Dónde celebraste el inicio del año actual?","¿Qué hiciste el día de tu cumpleaños?","¿Qué hiciste el día de la madre/padre?","¿Con quién estuviste el día del amor y la amistad?","¿Dónde celebraste la navidad?"],
    mediaType:"Questions"
  },
  {
    exerciseNumber: "Ejercicio 4.1",
    icon: "./assets/img/brain2.png",
    title: "Identificación de errores en un texto.",
    description: "Lea el texto a continuación y escriba abajo los errores que vea en él.",
    module: "2",
    id: "17",
    media: ["En la mesa estaban sentadas todas las persianas, la comida estaba hecha de pasta y tomate, para brindar utilizaron el vino que estaba servido en las coperas; y al finalizar destaparon los regalos que los invitadinos habían traído. El motivo de la celebración era el cumpleaños de la abuela. Eran muchos los regalos, fueron puestos sobre el mantel que servía para cuberir la mesa. La abuela estaba feliz y para agradecer leyó un discurse que ella misma había escrito."],
    mediaType:"Text"
  }
  ,{
    exerciseNumber: "Ejercicio 4.8",
    icon: "./assets/img/brain2.png",
    title: "Semejanza entre dos imágenes.",
    description: "Escriba las semejanzas que vea entre los dos personajes.",
    module: "2",
    id: "24",
    media:["./assets/img/exe/sim.png"]
  }]; //machetazo

  constructor( private dataService: DataService, private storage: Storage, private alertCtrl: AlertController, private router: Router,  private userData: UserData, private adultData: AdultService, public datepipe: DatePipe) { }

  async ngOnInit() {
    this.exercises = this.dataService.getExercises();
    // this.adults = this.dataService.getAdults();
    this.loadAdults();
    // this.loadAdultsDB();
    console.log("ExerValues",this.exerValues);
    await this.storage.create();

  }

  loadAdults(){
    this.dataService.getAdultsStorage().then((adults)=>{
      this.adults=adults;
      console.log('Se cargaron correctamente todos ', this.adults);
    });
  }


  // async loadAdultsDB() {
  //   let err: boolean = false;
  //   try {
  //     let value = await this.adultData.getAdults();
  //     console.log(value);
  //     this.adultsDB = value;
  //     console.log("Este es AdultsDB ", this.adultsDB);
  //     if (value == null) {
  //       err = true;

  //       console.log('No se encontraron adultos para cargar');
  //     } else {

  //       console.log('Se cargaron correctamente');
        
  //     }
  //   } catch (error) {
  //     console.log('Hubo un error trayendo los adultos: ');
  //     console.log(error);
  //   }

  // }

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
    //let dateFormat =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.user = await this.storage.get('user');
    console.log(this.user);

    await this.storage.set('workSession', {'id':this.sessionId,'exercises':this.exerValues,'adult':this.aValues, 'user':this.user ,'date':date});
    this.sessionId++;
    
    const auxiliar = await this.storage.get('workSession');
    console.log(auxiliar);

    //this.presentAlertConfirm();
    this.router.navigateByUrl('/exercise');
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
