import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Adult } from '../interfaces/adult';
import { WorkSession, Session } from '../interfaces/workSession';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseServiceService{

  constructor(public http: HttpClient) {
		super(http)
  }

  insertSession(data: Session){
    try {
      return this.consumeAPI('/session/insert', { id_user: data.id_user, id_adult: data.id_adult, date: data.date, observations: data.observations });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.insertSession.name} ${e}`)
    }
  }

  insertSessionExercise(data: any){
    try {
      return this.consumeAPI('/session/insertExerciseSession', { id_session: data.id_session, id_exercise: data.id_exercise, date: data.date, observations: data.observations });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.insertSession.name} ${e}`)
    }
  }

  getSessionId(data: Session) {
    try {
      return this.consumeAPI('/session/getId', {id_user: data.id_user, id_adult: data.id_adult, date: data.date, observations: data.observations});
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.getSessionById.name} ${e}`)
    }
  }

  getSessionById(data: number) {
    try {
      return this.consumeAPI('/session/getById', { id: data });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.getSessionById.name} ${e}`)
    }
  }

  getSessions(){
    try {
      return this.consumeAPI('/session/get');
    } catch (e) {
      console.log(`An error has occurred getting the adults: ${this.getSessions.name} ${e}`)
    }
  }

  updateSession(data: Session){
    try {
      return this.consumeAPI('/session/update', {})
    } catch(e){
      console.log(`An error has occurred updating the adult: ${this.updateSession.name} ${e}`)
    }
  }

  deleteSession(data: number){
    try {
      return this.consumeAPI('/session/delete', {id: data})
    } catch(e){
      console.log(`An error has occurred deleting the adult: ${this.deleteSession.name} ${e}`)
    }
  }


}