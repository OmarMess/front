import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:4049/auth/login';
  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { mail, password });
  }
}
