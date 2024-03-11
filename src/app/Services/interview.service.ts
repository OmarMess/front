import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntretienTechnique} from 'app/models/entretien-technique.model';
import { Observable, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private baseUrl = 'http://localhost:4049/interview/status';

  constructor(private http: HttpClient) { }

  getInterviewByStatus(status: string): Observable<EntretienTechnique[]>{
    return this.http.get<EntretienTechnique[]>(`${this.baseUrl}/${status}`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue:', error);
        return of([]); 
      })
    );
  }
}
