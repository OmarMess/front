import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:4049/auth/login';
  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<any> {

    // return this.http.post<any>(this.baseUrl, { mail, password });
    return this.http.post<any>(this.baseUrl, { mail, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized error
          return throwError('Invalid email or password.');
        } else {
          // Other errors
          return throwError('An error occurred while logging in. Please try again later.');
        }
      })
    );
  

  }

 
}
