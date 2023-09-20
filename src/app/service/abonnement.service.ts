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
    return this.http.get("http://127.0.0.1:8085/abonnements");
  }

  addAbonnement(data: Abonnement):  Observable<any>{
    return this.http.post<Abonnement>("http://127.0.0.1:8085/addabonnement",data)
  }

  deleteabonnement(id: number): Observable<any>{
    return this.http.delete(`http://127.0.0.1:8085/deleteabonnement/${id}`)
  }

  update(data: Abonnement){
    return this.http.put<Abonnement>("http://127.0.0.1:8085/updateabonnement",data)
  }

  getUsers(): Observable<any>{
    return this.http.get("http://127.0.0.1:8085/users");
  }
}
