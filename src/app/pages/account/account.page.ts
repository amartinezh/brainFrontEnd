import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserData } from 'src/app/services/user-data';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  ngOnInit() {
  }

  user: any;
  usersDB: any;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar nombre',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
            this.router.navigateByUrl('/home');        
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.user,
          placeholder: 'Nombre'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUser().then((user) => {
      this.user = user;
    });
  }


  // async getUsername() {
  //   let err: boolean = false;
  //   try {
  //     let value = await this.userService.getUsers();
  //     console.log(value);
  //     this.usersDB = value;
  //     console.log("Este es usersDB ", this.usersDB);
  //     if (value == null) {
  //       err = true;

  //       console.log('No se encontraron usuarios para cargar');
  //     } else {

  //       console.log('Se cargaron correctamente');
        
  //     }
  //   } catch (error) {
  //     console.log('Hubo un error trayendo los usuarios: ');
  //     console.log(error);
  //   }
  // }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }

}
