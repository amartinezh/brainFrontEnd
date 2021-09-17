import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Adult } from '../interfaces/adult'

@Injectable({
  providedIn: 'root'
})
export class AdultService extends BaseServiceService{

  constructor(public http: HttpClient) {
		super(http)
  }
  
  getAdultById(data: Adult) {
    try {
      return this.consumeAPI('/adult/getById', { id: data.id });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.getAdultById.name} ${e}`)
    }
  }

  insertAdult(data: Adult){
    try {
      return this.consumeAPI('/adult/insert', { id: data.id, name: data.name, birth_date: data.birth_date });
    } catch (e) {
      console.log(`An error has occurred inserting the adult: ${this.insertAdult.name} ${e}`)
    }
  }

  getAdults(){
    try {
      return this.consumeAPI('/adult/get');
    } catch (e) {
      console.log(`An error has occurred getting the adults: ${this.getAdults.name} ${e}`)
    }
  }

  updateAdult(data: Adult){
    try {
      return this.consumeAPI('/adult/update', {id: data.id, name: data.name, birth_date: data.birth_date})
    } catch(e){
      console.log(`An error has occurred updating the adult: ${this.updateAdult.name} ${e}`)
    }
  }

  deleteAdult(data: Adult){
    try {
      return this.consumeAPI('/adult/delete', {id: data.id})
    } catch(e){
      console.log(`An error has occurred deleting the adult: ${this.deleteAdult.name} ${e}`)
    }
  }


}