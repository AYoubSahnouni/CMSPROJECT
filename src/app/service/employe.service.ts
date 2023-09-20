import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private httpClient: HttpClient) { }


  getallphonenumber(){
    return this.httpClient.get("http://127.0.0.1:8085/numberphone");
  }

  fetchabonnement(): Observable<any>{
    return this.httpClient.get("http://127.0.0.1:8085/abonnements");
  }
  getLogEntries() {
    return this.httpClient.get<any[]>("http://127.0.0.1:8085/logs");
  }

  update(data: User){
    return this.httpClient.put<User>("http://127.0.0.1:8085/update",data)
  }

  addUser(data: User): Observable<any>{
    return this.httpClient.post<User>("http://127.0.0.1:8085/addemployer",data)
  }

  getUsers(): Observable<any>{
    return this.httpClient.get("http://127.0.0.1:8085/users");
  }

  getEmployewithTelephone(): Observable<any> {
      return this.httpClient.get("http://127.0.0.1:8085/userswithaffectation");
  }

  deleteEmployee(id: number): Observable<any>{
    return this.httpClient.delete(`http://127.0.0.1:8085/deleteEmploye/${id}`)
  }

  getEmployewithoutTelephone(): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:8085/userswithoutaffectation");
  }

  getEmploye(id: number){
    return this.httpClient.get(`http://127.0.0.1:8085/user/${id}`);
  }


}
