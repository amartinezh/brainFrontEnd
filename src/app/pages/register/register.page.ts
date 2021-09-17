import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserData } from '../../services/user-data';
import { UserService } from '../../services/user.service';
import { Platform, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {id:'', email:'', password:'', name:'', cellphone:'', birth_date:''};
  submitted = false;

  constructor(private userData: UserData, private router: Router, private userService: UserService, private toastController: ToastController) { }

  ngOnInit() {
  }

  // onSignup(form: NgForm){
  //   console.log(form);
  //   this.submitted = true;
  //   if (form.valid) {
  //     this.userData.signup(this.user);
  //     this.router.navigateByUrl('/login');
  //   }
  // }

  async onSignup(form: NgForm){
    let err: boolean = false;
    try {
      if (form.invalid) {
        return;
      }
      await this.userService.insertUser(this.user);
      this.presentToast("Se ha registrado exitosamente.", "success");
      this.router.navigateByUrl('/login');
    } catch (error) {
      this.presentToast("Vaya, parece que ha habido un error.", "danger");
      console.log('Al parecer hubo un error al insertar el usuario en la Base de Datos.');
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
