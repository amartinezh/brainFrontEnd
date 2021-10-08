import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MenuItem } from '../interfaces/menuItem';
import { Exercise } from '../interfaces/exercise';
import { Adult } from '../interfaces/adult';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient, private storage: Storage) { }

  // getExercises(){
  //   return this.http.get('https://jsonplaceholder.typicode.com/posts');
  // }

  getMenuItems(){
    return this.http.get<MenuItem[]>('mnemosyne/assets/data/menu.json');
  }

  getExercises(){
    return this.http.get<Exercise[]>('mnemosyne/assets/data/exercises.json');
  }

  getAdults(){
    return this.http.get<Adult[]>('/assets/data/adults.json');
  }

  addAdultStorage(adult: Adult): Promise<any>{
    return this.storage.get('adults').then((adults: Adult[]) => {
      if(adults){
        adults.push(adult);
        return this.storage.set('adults', adults);
      }
      else{
        return this.storage.set('adults', [adult]);
      }
    });
  }

  getAdultsStorage(): Promise<Adult[]>{
    return this.storage.get('adults');
  }

  updateAdultStorage(adult: Adult): Promise<any>{
    return this.storage.get('adults').then((adults: Adult[]) => {
      if(!adults || adults.length === 0){
        return null;
      }

      let newAdults: Adult[] = [];

      for(let i of adults){
        if(i.id === adult.id || i.name === adult.name){
          newAdults.push(adult);
        } else {
          newAdults.push(i);
        }
      }

      return this.storage.set('adults', newAdults);
    });
  }

  deleteAdultStorage(adult: Adult): Promise<Adult> {
    return this.storage.get('adults').then((adults: Adult[]) => {
      if(!adults || adults.length === 0){
        return null;
      }

      let keepAdults: Adult[] = [];

      for(let i of adults){
        if(i.id !== adult.id){
          keepAdults.push(i);
        }
      }

      return this.storage.set('adults', keepAdults);
    });
  }

}
