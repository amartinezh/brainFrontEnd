import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserData } from '../../services/user-data';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {id:'', email:'', password:'', name:'', cellphone:'', birthDate:''};
  submitted = false;

  constructor(private userData: UserData, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    console.log(form);
    this.submitted = true;
    if (form.valid) {
      this.userData.signup(this.user);
      this.router.navigateByUrl('/login');
    }
  }

}
