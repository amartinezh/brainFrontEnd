import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Adult } from '../interfaces/adult';
import { WorkSession, Session } from '../interfaces/workSession';
import { SessionExercise } from '../interfaces/sessionExercise';
import { ExerciseMedia } from '../interfaces/exerciseMedia';

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
      console.log(`An error has occurred Inserting the session: ${this.insertSession.name} ${e}`)
    }
  }

  insertSessionExercise(data: SessionExercise){
    try {
      return this.consumeAPI('/session/insertExerciseSession', { id_session: data.id_session, id_exercise: data.id_exercise, correct: data.correct, observation: data.observations });
    } catch (e) {
      console.log(`An error has occurred inserting the session exercise: ${this.insertSessionExercise.name} ${e}`)
    }
  }

  insertExerciseMedia(data: ExerciseMedia){
    try {
      return this.consumeAPI('/session/insertMediaExercise', { id_session: data.id_session, id_exercise: data.id_exercise, id_media: data.id_media, observation: data.observation });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.insertExerciseMedia.name} ${e}`)
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