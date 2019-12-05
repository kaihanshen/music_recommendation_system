import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = 'http://localhost:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllMusic(): Observable<any>{
    return this.http.get(this.baseurl + '/music/', 
    {headers:this.httpHeaders})
  }

  getOneMusic(id: string): Observable<any>{
    return this.http.get(this.baseurl + '/music/'+id , 
    {headers:this.httpHeaders})
  }

  searchMusic(name: string): Observable<any>{
    const body = {title:name}
    return this.http.post(this.baseurl + '/music/'+'search/', body,
    {headers:this.httpHeaders})
  }

  updateMusic(music): Observable<any>{
    const body = {title:music.title, desc:music.desc,year:music.year}
    return this.http.put(this.baseurl + '/music/' + '' + music.id + '/', body,
    {headers:this.httpHeaders})
  }

  createMusic(music): Observable<any>{
    const body = {title:music.title, desc:music.desc,year:music.year}
    return this.http.post(this.baseurl + '/music/', body,
    {headers:this.httpHeaders})
  }

  deleteMusic(id): Observable<any>{
    return this.http.delete(this.baseurl + '/music/' + '' + id + '/',
    {headers:this.httpHeaders})
  }

  getSinger(id): Observable<any>{
    return this.http.get(this.baseurl + '/singer/'+id , 
    {headers:this.httpHeaders})
  }
}
