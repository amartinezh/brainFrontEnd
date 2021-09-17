import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseServiceService{

  constructor(public http: HttpClient) {
		super(http)
  }
  
  val(data: User) {
    try {
      return this.consumeAPI('/user/val', { email: data.email, apppassword: data.password });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.val.name} ${e}`)
    }
  }

}