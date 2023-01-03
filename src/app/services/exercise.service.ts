import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  addExercise(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/exercise/add/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  updateExercise(data: any): Observable<any> {
    return this.httpClient.patch(this.url + '/exercise/update/', data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }


  getExercises(): Observable<any> {
    return this.httpClient.get(this.url + "/exercise/get/")
  }

  updateStatus(data: any): Observable<any> {
    return this.httpClient.patch(this.url + '/exercise/updateStatus/', data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(this.url + '/exercise/getById/' + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }


  getByCategory(id: any): Observable<any> {
    return this.httpClient.get(this.url + '/exercise/getByCategory/' + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }


  deleteExercise(id: any): Observable<any> {
    return this.httpClient.delete(this.url + '/exercise/delete/' + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}
