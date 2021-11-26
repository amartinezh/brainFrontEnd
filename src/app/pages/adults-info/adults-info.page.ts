import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';
import { Adult } from 'src/app/interfaces/adult';
import { AdultService } from 'src/app/services/adult.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adults-info',
  templateUrl: './adults-info.page.html',
  styleUrls: ['./adults-info.page.scss'],
})
export class AdultsInfoPage implements OnInit {

  adultsJSON: Adult[] = [];
  adults: Adult[] = [];
  adultsDB: any;
  newAdult: Adult;
  newA: Adult;

  constructor(private storage: Storage, private userData: DataService, private plt: Platform, private toastController: ToastController, private alertCtrl: AlertController, private adultService: AdultService) {
    // this.plt.ready().then(()=>{
    //   this.loadAdultsJSONtoStorage();
    //   setTimeout(() => {
    //     this.jsonAdults();  
    //   }, 2000);
    //   setTimeout(() => {
    //     this.loadAdults();  
    //   }, 2100);
      
    // });

    this.loadAdultsDB();
    
   }

  async ngOnInit() {
    // await this.loadAdultsJSONtoStorage();
    // this.jsonAdults();
    // this.loadAdults();
    
    
  }

  async loadAdultsJSONtoStorage(){
    this.userData.getAdults().subscribe((adults: Adult[])=>{
      this.adultsJSON = adults;
      // console.log(this.adults);      
    });
  }

  loadAdults(){
    this.userData.getAdultsStorage().then((adults)=>{
      this.adults=adults;
      // console.log('Se cargaron correctamente todos ', this.adults);
    });
  }

  async loadAdultsDB() {
    let err: boolean = false;
    try {
      let value = await this.adultService.getAdults();
      // console.log(value);
      this.adultsDB = value;
      // console.log("Se cargaron correctamente todos ", this.adultsDB);
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

  jsonAdults(){
    for(let a of this.adultsJSON){
      this.userData.addAdultStorage(a);
      // console.log('adulto '+a.name+' añadido al storage');
    }
    // console.log(this.adultsJSON);
  }

  async update(adult: Adult){
    this.userData.updateAdultStorage(adult).then(()=>{
      this.presentToast("Adulto Actualizado.","secondary");
      this.loadAdults();
    });
  }

  async updateAdult(adult: Adult){
    let err: boolean = false;
    try {
      await this.adultService.updateAdult(adult);
      this.presentToast("El adulto ha sido actualizado exitosamente.", "success");
      this.loadAdultsDB();
    } catch (error) {
      console.log('Al parecer hubo un error al actualizar el adulto en la Base de Datos.');
      console.log(error);
    }
  }

  // delete(adult: Adult){
  //   this.userData.deleteAdultStorage(adult).then(()=>{
  //     this.presentToast("Aduto Eliminado.","danger");
  //     this.loadAdults();
  //   });
  // }

  async deleteAdult(adult: Adult){
    let err: boolean = false;
    try {
      await this.adultService.deleteAdult(adult);
      this.presentToast("El adulto ha sido eliminado exitosamente.", "success");
      this.loadAdultsDB();
    } catch (error) {
      console.log('Al parecer hubo un error al eliminar el adulto de la Base de Datos.');
      console.log(error);
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async presentToast(msg: string, clr: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: clr,
      duration: 2000
    });
    toast.present();
  }

  async presentAlertPrompt(a : Adult) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Digite nuevamente los datos para actualizar el adulto.',
      inputs: [
        {
          name: 'id',
          type: 'text',
          id: 'id',
          value: a.id,
          disabled: true
        },
        {
          name: 'name',
          type: 'text',
          id: 'name',
          value: a.name
        },
        {
          name: 'birth_date',
          type: 'date',
          id: 'birth_date',
          min: '1920-01-01',
          max: '2000-01-12',
          value: a.birth_date
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: ( data: Adult ) => {
            console.log('Confirm Ok', data);
            // this.newA.id = data.txtId;
            // this.newA.name = data.txtName;
            // this.newA.birthDate = data.txtBirth;
            // console.log(this.newA);
            this.updateAdult(data);
            // this.update(data);
          }
        }
      ]
    });

    await alert.present();
  }

}
