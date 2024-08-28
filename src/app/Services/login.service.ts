import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:4049/api/users/login';
  private currentUser: User;

  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<any> {
    return this.http.post<User>(this.baseUrl, { mail, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return throwError('Invalid email or password.');
        } else {
          return throwError('An error occurred while logging in. Please try again later.');
        }
      }),
      tap((response: User) => {
        this.setCurrentUser(response);
        console.log("User logged in:", this.currentUser);
      })
    );
  }

  hasRole(role: string): boolean {
    return this.currentUser && this.currentUser.role === role;
  }

  isManager(): boolean {
    return this.currentUser && this.currentUser.role === "Manager";
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    }
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
