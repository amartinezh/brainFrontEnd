import { Injectable } from '@angular/core';
import { BaseServiceService } from '../services/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Adult } from '../interfaces/adult';
import { WorkSession } from '../interfaces/workSession';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseServiceService{

  constructor(public http: HttpClient) {
		super(http)
  }

  insertSession(data: WorkSession, adult: Adult){
    try {
      return this.consumeAPI('/session/insert', {  });
    } catch (e) {
      console.log(`An error has occurred validating the user: ${this.insertSession.name} ${e}`)
    }
  }

}