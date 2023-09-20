import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  router: any;

  constructor(private http:HttpClient,private cookieService: CookieService) { }

  private readonly TOKEN_KEY = 'my_token';
  apiURL = " http://127.0.0.1:8085/login"

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

  logout(): void {
    this.cookieService.delete(this.TOKEN_KEY);
    console.log(this.getToken());
  }
  setToken(token:any): void {
    this.cookieService.set(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return this.cookieService.get(this.TOKEN_KEY);
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
