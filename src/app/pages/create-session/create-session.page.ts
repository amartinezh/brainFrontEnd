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
  adults: Observable<Adult[]>;
  // adults: Adult[] = [];
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
    title: "Evocaci??n de acontecimientos autobiogr??ficos por el uso de palabras claves.",
    description: "Con base en las preguntas que se ofrecen, responda:",
    module: "1",
    id: "1",
    media: ["??Cu??l es su fecha de nacimiento?","??Cu??l es el lugar donde pas?? su infancia?","??Qui??n era tu padre?","??Qui??n era tu madre?","??C??mo se llaman tus hermanos/as?","??Cu??l era la escuela a la que ibas?","??Viv??as en la ciudad o en el campo?","??Cu??l fue tu primer trabajo?","??Cu??l es la fecha de tu matrimonio?","??En qu?? iglesia te casaste?","??Qui??nes son tus hijos?","??Cu??l es el viaje que m??s te ha gustado?","??Cu??l es el mayor logro de tu vida?","??Cu??ntos nietos tienes?","??C??mo se llaman tus nietos?","??Cu??l es tu lugar donde vives ahora?"],
    mediaType:"Questions"
  },{
    exerciseNumber: "Ejercicio 1.3",
    icon: "./assets/img/brain2.png",
    title: "Identificaci??n de fechas importantes en el ciclo vital del participante usando palabras claves.",
    description: "Se le har??n distintas preguntas relacionadas con su vida, por favor responda.",
    module: "1",
    id: "3",
    media: ["-??Cu??l fue el momento m??s dif??cil que vivi?? con su familia?","-??Cu??l fue el momento m??s feliz que vivi?? con su familia?","-??Cu??ndo se le cay?? el primer diente a su hijo?","-??Cu??ndo conoci?? a su pareja?","-??Cu??nto tiempo llevan o llevaban juntos?","-??Cu??ndo fue su boda?","-??Cu??ndo fue su primer trabajo?","-??A qu?? edad consigui?? su primer trabajo?","-??Cu??ntos trabajos realizo en su vida?","-??Cu??ndo fue su ??ltimo trabajo?","-??D??nde creci???","-??Qu?? recuerda de su ni??ez?","-??Qu?? le gustaba cuando era peque??o?","-??Qu?? no le gustaba cuando era peque??o?","-??Qu?? extra??a de cuando era peque??o?","-??Qu?? quer??a ser cuando fuera grande?","-??Qu?? es lo que primero que recuerda del estudio?","-??Qu?? recuerda hacer en los recreos?","-??Qu?? recuerda de sus profesores?","-??Qu?? recuerda de sus compa??eros?","-??Anteriormente qu?? le gustaba hacer en su tiempo libre?","-??Qu?? aromas y sabores le recuerda la comida?","-??Cu??l fue el momento que m??s satisfacci??n trajo a su vida?","-??Cu??l fue el momento que m??s desgracia trajo a su vida?","-??Qu?? metas tenia?","-??Pudo cumplir alguna de sus metas?","-??Qu?? le hubiera gustado cambiar en su vida?"],
    mediaType:"Questions"
  },{
    exerciseNumber: "Ejercicio 1.6",
    icon: "./assets/img/brain2.png",
    title: "Recuerdo de los acontecimientos principales del a??o en curso.",
    description: "Se deben hacer preguntas sobre sucesos ocurridos durante el a??o actual y el adulto debe responder correctamente, por ejemplo.",
    module: "1",
    id: "6",
    media: ["??D??nde celebraste el inicio del a??o actual?","??Qu?? hiciste el d??a de tu cumplea??os?","??Qu?? hiciste el d??a de la madre/padre?","??Con qui??n estuviste el d??a del amor y la amistad?","??D??nde celebraste la navidad?"],
    mediaType:"Questions"
  },
  {
    exerciseNumber: "Ejercicio 4.1",
    icon: "./assets/img/brain2.png",
    title: "Identificaci??n de errores en un texto.",
    description: "Lea el texto a continuaci??n y escriba abajo los errores que vea en ??l.",
    module: "2",
    id: "17",
    media: ["En la mesa estaban sentadas todas las persianas, la comida estaba hecha de pasta y tomate, para brindar utilizaron el vino que estaba servido en las coperas; y al finalizar destaparon los regalos que los invitadinos hab??an tra??do. El motivo de la celebraci??n era el cumplea??os de la abuela. Eran muchos los regalos, fueron puestos sobre el mantel que serv??a para cuberir la mesa. La abuela estaba feliz y para agradecer ley?? un discurse que ella misma hab??a escrito."],
    mediaType:"Text"
  }
  ,{
    exerciseNumber: "Ejercicio 4.8",
    icon: "./assets/img/brain2.png",
    title: "Semejanza entre dos im??genes.",
    description: "Escriba las semejanzas que vea entre los dos personajes.",
    module: "2",
    id: "24",
    media:["./assets/img/exe/sim.png"]
  }]; //machetazo

  constructor( private dataService: DataService, private storage: Storage, private alertCtrl: AlertController, private router: Router,  private userData: UserData, private adultData: AdultService, public datepipe: DatePipe) { }

  async ngOnInit() {
    this.exercises = this.dataService.getExercises();
    this.adults = this.dataService.getAdults();
    // this.loadAdults();
    this.loadAdultsDB();
    // console.log("ExerValues",this.exerValues);
    await this.storage.create();

  }

  // loadAdults(){
  //   this.dataService.getAdultsStorage().then((adults)=>{
  //     this.adults=adults;
  //     console.log('Se cargaron correctamente todos ', this.adults);
  //   });
  // }


  async loadAdultsDB() {
    let err: boolean = false;
    try {
      let value = await this.adultData.getAdults();
      // console.log(value);
      this.adultsDB = value;
      // console.log("Este es AdultsDB ", this.adultsDB);
      if (value == null) {
        err = true;

        console.log('No se encontraron adultos para cargar');
      } else {

        console.log('Se cargaron correctamente los adultos');
        
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
    let dateFormat =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.user = await this.storage.get('user');
    // console.log(this.user);

    await this.storage.set('workSession', {'id':this.sessionId,'exercises':this.eValues,'adult':this.aValues, 'user':this.user ,'date':dateFormat});
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
    // console.log(this.aValues);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '??Sesi??n!',
      message: '??Desea iniciar la sesi??n de trabajo?',
      buttons: [
        {
          text: 'M??s tarde.',
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
