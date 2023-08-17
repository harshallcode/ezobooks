import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // url = "https://db.ezobooks.in/kappa/image/task";

  makeGetRequest() {
    return this.http.get("https://db.ezobooks.in/kappa/image/task")
  }

}
