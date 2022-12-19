import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  addCategory(data: any): Observable<any> {
    return this.httpClient.post(this.url + "/category/add/", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  updateCategory(data: any): Observable<any> {
    return this.httpClient.patch(this.url + '/category/update/', data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }


  getCategories(): Observable<any> {
    return this.httpClient.get(this.url + "/category/get/")
  }


}
