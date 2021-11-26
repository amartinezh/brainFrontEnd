import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserData } from '../../services/user-data';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {id:'', email:'', password:'', name:'', cellphone:'', birth_date:''};
  submitted = false;
  loggedIn: boolean = false;
  uValue: User;

  constructor(public router: Router, private userData: UserData, private toastCtrl: ToastController, private loginService: LoginService) { }

  ngOnInit() {
  }

  // onLogin(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {

  //     this.userData.login(this.user.email);
      
  //     // console.log(this.userData.getUser());

  //     // const value = this.userData.getUser().then((res: User) => {
  //     //   this.uValue = res;
  //     //   console.log(this.uValue);
  //     //   return res;
  //     // });
      
  //     // if(this.user.email == this.uValue.email && this.user.password == this.uValue.password){
  //     //   this.router.navigateByUrl('/home');
  //     //   this.loggedIn = true;
  //     //   console.log("If true");
  //     // } else {
  //     //   console.log("false");
  //     // }
    
  //   }
    
  //   console.log(form);

  //   this.router.navigateByUrl('/home');
 
  // }

  async onLogin(form: NgForm) {
    let err: boolean = false;
    this.submitted = true;
    try {
      if (form.invalid) {
        return;
      }
      let value = null;
      value = await this.loginService.val(this.user)
      // console.log("Value ",value);
      // console.log("Value as User ",value as User);
      if (value == null) {
         err = true;
         //this.toast.showMessage('Al parecer no te encuentras registrado!!', 'success');
         console.log('Al parecer no te encuentras registrado!!');
      } else {
        this.router.navigateByUrl('/home');
        //this.toast.showMessage('Disfruta!!', 'success');
        console.log('Disfruta!!');
        this.userData.login(this.user.email);
        this.userData.loginUser(value as User);
        this.loggedIn = true;

      //   //Esta linea esta marcando error de TypeError: Cannot read properties of undefined (reading 'id')
      //   //localStorage.setItem("r", value['user'].id); 
        
      }
    } catch (error) {
      //this.toast.showMessage('Al parecer no te encuentras registrado!!', 'error');
      console.log('Al parecer no te encuentras registrado!! catch');
      console.log(error);
    }

  }


  onSignup() {
    this.router.navigateByUrl('/register');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Correo o Contraseña incorrectos.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  // async getUser(){
  //   this. uValue = await this.userData.getUserAsync();
  //   return this.uValue;
  // }

}
