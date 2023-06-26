import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abonnement } from '../model/abonnement';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(private http:HttpClient) { }

  getAbonnement(): Observable<any>{
    return this.http.get("http://localhost:8080/abonnements");
  }

  addAbonnement(data: Abonnement):  Observable<any>{
    return this.http.post<Abonnement>("http://localhost:8080/addabonnement",data)
  }

  deleteabonnement(id: number): Observable<any>{
    return this.http.delete(`http://localhost:8080/deleteabonnement/${id}`)
  }

  update(data: Abonnement){
    return this.http.put<Abonnement>("http://localhost:8080/updateabonnement",data)
  }

  getUsers(): Observable<any>{
    return this.http.get("http://localhost:8080/users");
  }
}
