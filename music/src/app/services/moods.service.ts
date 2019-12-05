import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {
  username = '';
  baseurl = 'http://localhost:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  
  getMoods(username): Observable<any>{
    return this.http.get(this.baseurl + '/mood/'+username,
    {headers:this.httpHeaders})
  }

  createMoods(checkInfo): Observable<any>{
    const body = {username:checkInfo.username, party:checkInfo.party, romance:checkInfo.romance, focus:checkInfo.focus, throwback:checkInfo.throwback, fitness:checkInfo.fitness, sleep:checkInfo.sleep, chill:checkInfo.chill, blue:checkInfo.blue, frustrated:checkInfo.frustrated, depressed:checkInfo.depressed};;
    return this.http.post(this.baseurl + '/mood/', body,
    {headers:this.httpHeaders})
  }
}
