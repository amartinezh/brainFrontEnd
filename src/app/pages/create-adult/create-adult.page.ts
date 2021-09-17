import { Component, OnInit } from '@angular/core';
import { Adult } from '../../interfaces/adult';
import { NgForm } from '@angular/forms';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AdultService } from 'src/app/services/adult.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-adult',
  templateUrl: './create-adult.page.html',
  styleUrls: ['./create-adult.page.scss'],
})
export class CreateAdultPage implements OnInit {

  adult: Adult = {id:'',name:'', birth_date:''};

  constructor(private userData: UserData, private router: Router, private dataService: DataService, private toastController: ToastController, private adultService: AdultService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    console.log(form);
    if (form.valid) {
      //this.userData.signupAdult(this.user);
      this.dataService.addAdultStorage(this.adult);
      this.presentToast("Aduto Añadido.","success");
    }

  }

  async onAdultSignup(form: NgForm) {
    let err: boolean = false;
    try {
      if (form.invalid) {
        return;
      }
      await this.adultService.insertAdult(this.adult);
      this.presentToast("El adulto ha sido agregado exitosamente.", "success");
    } catch (error) {
      console.log('Al parecer hubo un error al insertar el adulto en la Base de Datos.');
      console.log(error);
    }

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
