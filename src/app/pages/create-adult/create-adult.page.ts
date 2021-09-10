import { Component, OnInit } from '@angular/core';
import { Adult } from '../../interfaces/adult';
import { NgForm } from '@angular/forms';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-adult',
  templateUrl: './create-adult.page.html',
  styleUrls: ['./create-adult.page.scss'],
})
export class CreateAdultPage implements OnInit {

  user: Adult = {id:'',name:'', birthDate:''};

  constructor(private userData: UserData, private router: Router, private dataService: DataService, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    console.log(form);
    if (form.valid) {
      //this.userData.signupAdult(this.user);
      this.dataService.addAdultStorage(this.user);
      this.presentToast("Aduto Añadido.","success");
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
