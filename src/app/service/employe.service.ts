import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private httpClient: HttpClient) { }



  fetchabonnement(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/abonnements");
  }

  update(data: User){
    return this.httpClient.put<User>("http://localhost:8080/update",data)
  }

  addUser(data: User): Observable<any>{
    return this.httpClient.post<User>("http://localhost:8080/addemployer",data)
  }

  getUsers(): Observable<any>{
    return this.httpClient.get("http://localhost:8080/users");
  }

  getEmployewithTelephone(): Observable<any> {
      return this.httpClient.get("http://localhost:8080/userswithaffectation");
  }

  deleteEmployee(id: number): Observable<any>{
    return this.httpClient.delete(`http://localhost:8080/deleteEmploye/${id}`)
  }

  getEmployewithoutTelephone(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/userswithoutaffectation");
  }

  getEmploye(id: number){
    return this.httpClient.get(`http://localhost:8080/user/${id}`);
  }


}
