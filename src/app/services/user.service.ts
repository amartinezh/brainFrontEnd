import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseServiceService{

  constructor(public http: HttpClient) {
		super(http)
  }
  
  getUserById(data: User) {
    try {
      return this.consumeAPI('/user2/getById', { id: data.id });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.getUserById.name} ${e}`)
    }
  }

  insertUser(data: User){
    try {
      return this.consumeAPI('/user2/insert', { id: data.id, name: data.name, email: data.email, apppassword: data.password, cellphone: data.cellphone, birth_date: data.birth_date });
    } catch (e) {
      console.log(`An error has occurred inserting the user: ${this.insertUser.name} ${e}`)
    }
  }

  getUsers(){
    try {
      return this.consumeAPI('/user2/get');
    } catch (e) {
      console.log(`An error has occurred getting the adults: ${this.getUsers.name} ${e}`)
    }
  }

  updateUser(data: User){
    try {
      return this.consumeAPI('/user2/update', { id: data.id, name: data.name, email: data.email, apppassword: data.password, cellphone: data.cellphone, birth_date: data.birth_date })
    } catch(e){
      console.log(`An error has occurred updating the user: ${this.updateUser.name} ${e}`)
    }
  }

  deleteUser(data: User){
    try {
      return this.consumeAPI('/user2/delete', {id: data.id})
    } catch(e){
      console.log(`An error has occurred deleting the user: ${this.deleteUser.name} ${e}`)
    }
  }


}