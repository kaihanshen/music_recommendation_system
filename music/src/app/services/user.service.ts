import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }


  register(user) {
      return this.http.post(this.baseurl+'/user', user);
  }
}
