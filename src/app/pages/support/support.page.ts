import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
 
  submitted = false;
  supportMessage: string;

  constructor(public alertCtrl: AlertController,public toastCtrl: ToastController) { 
  }

  ngOnInit() {
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'Tu mensaje ha sido enviado.',
        duration: 3000
      });
      await toast.present();
    }
  }

}
