import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import { Adult } from '../interfaces/adult';


@Injectable({
  providedIn: 'root'
})

export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage
  ) { }

  // login(username: string): Promise<any> {
  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setUsername(username);
  //     return window.dispatchEvent(new CustomEvent('user:login'));
  //   });
  // }

  // async loginAsync(user: User): Promise<any>{

  //   await this.storage.set(this.HAS_LOGGED_IN, true);
  //   await this.storage.set('user',user);
  //   return window.dispatchEvent(new CustomEvent('user:login'));

  // }

  // signup(user: User): Promise<any> {
  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setUser(user);
  //     return window.dispatchEvent(new CustomEvent('user:signup'));
  //   });
  // }

  // async signup(user: User): Promise<any>{
  //   await this.storage.set('user',user);
  //   return window.dispatchEvent(new CustomEvent('user:signup'));
  // }

  // logout(): Promise<any> {
  //   return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
  //     return this.storage.remove('name');
  //   }).then(() => {
  //     window.dispatchEvent(new CustomEvent('user:logout'));
  //   });
  // }

  setUser(user: User): Promise<any> {
    return this.storage.set('user', user);
  }

  // getUser(){
  //   return this.storage.get('user').then((value) => {
  //     return value;
  //   });
  // }

  // async getUserAsync(){
  //   var user: User;
  //   user = await this.storage.get('user');
  //   return user;
  // }


  // isLoggedIn(): Promise<boolean> {
  //   return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
  //     return value === true;
  //   });
  // }

  signupAdult(adult: Adult): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setAdult(adult);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  setAdult (adult: Adult): Promise<any> {
    return this.storage.set('adult', adult);
  }

  
  loginUser(user: User): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUser(user);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(user: User): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, false).then(() => {
      this.setUser(user);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username'), this.storage.remove('user');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUser(): Promise<string> {
    return this.storage.get('user').then((value) => {
      return value;
    });
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

}
