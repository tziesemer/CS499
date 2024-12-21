import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/users';
import { Authresponse } from '../models/authresponse';
import { RescuesDataService } from './rescues-data.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class AuthenticationService {
  
  private dataSubject = new Subject<any>();
  
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
              
  private rescueDataService: RescuesDataService) { }
//getToken pulls the currently held token from local storage and sends it to the calling function
  public getToken (): string  {
    let tempToken = JSON.stringify(this.storage.getItem('rescue-token'));
    return JSON.parse(tempToken);
  }

//saveToken stores current token to the local storage for later retrieval
  public saveToken (token: string): void {
    this.storage.setItem('rescue-token', token);
  }

  //Login function makes a http call back to the API to see if user entered information matches user database to login and creates a token if it is
  public login(user: User): void {
    let voidAuth = new Authresponse();
    let testOne = this.rescueDataService.login(user)
      .then((authResp: Authresponse) =>
        this.saveToken(authResp.token));
  }


  //Register makes an http call to save a new user to the user database for later logins
  public register(user: User): void {
    let regRes = this.rescueDataService.register(user)
        .then((authResp: Authresponse) =>
          this.saveToken(authResp.token));
  }

  //Logout removes token from local storage
  public logout (): void{
    this.storage.removeItem('rescue-token');
    this.loggedOut();
  }

  public loggedOut(){
    //Update dataSubject so that the listener can be triggered
    this.dataSubject.next('stuff');
    return this.dataSubject.asObservable();
  }

  //Checks if token is present and has not expired
  public isLoggedIn (): boolean {
    const token = this.getToken();
    //console.log('token' + token);
    //console.log('AuthenticationService::isLoggedin');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  //gets the user currently logged in
  public getCurrentUser() : User {
    let tempUser = new User();
    if(this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } =
      JSON.parse(atob(token.split('.')[1]));
      tempUser.email = email;
      tempUser.name = name;
      return tempUser;
    }else {
      return tempUser;
    }
  }
}
