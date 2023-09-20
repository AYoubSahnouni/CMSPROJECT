import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telephone } from '../model/telephone';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  constructor(private httpClient : HttpClient) { }





  deleteTele(id: number): Observable<any>{
    return this.httpClient.delete(`http://127.0.0.1:8085/deleteTele/${id}`)
  }


  update(data: Telephone){
    return this.httpClient.put<Telephone>("http://127.0.0.1:8085/updatephone",data)
  }

  addPhone(data: Telephone): Observable<any>{
    return this.httpClient.post<Telephone>("http://127.0.0.1:8085/AddPhone",data)
  }

  getphones(): Observable<any>{
    return this.httpClient.get("http://127.0.0.1:8085/t")
  }

  getall(): Observable<any>{
    return this.httpClient.get("http://127.0.0.1:8085/telephones")
  }
  getcirclechart(){
    return this.httpClient.get("http://127.0.0.1:8085/circlephone");
  }
}

