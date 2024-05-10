import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:4049/auth/login';
  private currentUser: any; // Property to store the current user

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
      }),

      tap((response: any) => {
        // Store the current user after successful login
        this.currentUser = response;
        console.log("*******************");
        console.log("*************" + this.isManager())
        console.log(this.currentUser);
      })
    );
  

  }

  
  hasRole(role: string): boolean {
    // Check if the current user has the specified role
    console.log("22222*******************");
    console.log(this.currentUser && this.currentUser.role === role);
    return this.currentUser && this.currentUser.role === role;
  }

  isManager() : boolean{
    console.log("555**************" + this.currentUser.role)
    return this.currentUser.role == "Manager";
  }
}
