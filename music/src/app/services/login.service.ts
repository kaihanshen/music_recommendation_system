import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  firstName = 'sssss';
  baseurl = 'http://localhost:8000';

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
      return this.currentUser;
  }

  public get nameValue() {
    return this.firstName;
}

  login(username, password) {
      return this.http.post<any>(this.baseurl + '/authenticate/', { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.firstName = user[0].firstname;
              console.log(this.firstName);
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
