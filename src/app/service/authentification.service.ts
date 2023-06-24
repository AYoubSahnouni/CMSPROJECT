import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }

  apiURL = " http://localhost:8080/login"

  GetUsers(){
      return this.http.get(this.apiURL);
  }
  login(user: any){
      return this.http.get(this.apiURL,{params:user});
  }
  ProceedRegister(inputdata: any){
    return this.http.post(this.apiURL,inputdata);
  }
  UpdateUser(code: any,inputdata: any){
    return this.http.put(this.apiURL+'/'+code,inputdata);
  }
}
