import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  addPlan(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/plan/addPlan/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }


  getPlans(): Observable<any> {

    return this.httpClient.get(this.url + '/plan/getPlans', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
      })
    });
  }

  generatePlan(id: any): Observable<any> {
    return this.httpClient.get(this.url + "/plan/generatePlan/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
  deletePlan(id: any): Observable<any> {
    return this.httpClient.delete(this.url + '/plan/deletePlan/' + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getWorstLift(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/powerlifting/worstLift/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

}
