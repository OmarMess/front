import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidat } from 'app/models/candidat.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {

  private baseUrl = 'http://localhost:4049/interview/candidat/profil';

  constructor(private http: HttpClient) { }

  getCandidatesByProfile(profil: string): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(`${this.baseUrl}/${profil}`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue:', error);
        return of([]); 
      })
    );
  }
}
