import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rescue } from '../models/rescues';
import { User } from '../models/users';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})

export class RescuesDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  url= 'http://localhost:3000/api/rescues';
  baseUrl = 'http://localhost:3000/api';
    getRescues() : Observable<Rescue[]> {
      //console.log("in Get rescues");
      let test = this.http.get<Rescue[]>(this.url);
      return test;
    }

    addRescue(formData: Rescue,  token: string) : Observable<Rescue> {
      let headers = new HttpHeaders({
        'Authorization': token  
      });

      return this.http.post<Rescue>(this.url, formData, {headers: headers});
    }

    getRescue(rescueCode: string) : Observable<Rescue[]> {
      //console.log('Inside RescueDataService::getRescue');
      return this.http.get<Rescue[]>(this.url + '/' + rescueCode);
    }

    updateRescue(formData: Rescue, token: string) : Observable<Rescue> {
      //console.log('Inside RescueDataService::updateRescue');
      let headers = new HttpHeaders({
        'Authorization': token  
      });
      return this.http.put<Rescue>(this.url + '/' + formData.testID, formData, {headers: headers});
    }

    deleteRescue(code: string, token: string) : Observable<Rescue> {
      //console.log('Inside RescueDataService::deleteRescue);
      let headers = new HttpHeaders({
        'Authorization': token
      });
      
      return this.http.delete<Rescue>(this.url + '/' + code, {headers: headers});
    }

    login(user: User) : Promise<Authresponse> {
      //console.log('in rescue-data login');
      return this.handleAuthAPICall('login', user);
    }

    register(user: User) : Promise<Authresponse> {
      return this.handleAuthAPICall('register', user);
    }

    handleAuthAPICall(endpoint: string, user: User) : Promise<Authresponse>{
      const useURL: string = `${this.baseUrl}/${endpoint}`;
      //const token = this.authenticationService.getToken();
      return this.http
        .post(useURL, user)
        .toPromise()
        .then();
    }
    
  }