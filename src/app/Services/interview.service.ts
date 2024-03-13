import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntretienTechnique} from 'app/models/entretien-technique.model';
import { Observable, catchError, of } from 'rxjs';
import { Statut } from 'app/enums/statut';
@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private baseUrl = 'http://localhost:4049/interviewtec/status';

  constructor(private http: HttpClient) { }

  getInterviewByStatus(status: string): Observable<EntretienTechnique[]>{
    return this.http.get<EntretienTechnique[]>(`${this.baseUrl}/${status}`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue:', error);
        return of([]); 
      })
    );
  }

  getAllInterviews(): Observable<EntretienTechnique[]>{
    return this.http.get<EntretienTechnique[]>(`${this.baseUrl}/`).pipe(
      catchError(error => {
        console.error('Une erreur est survenue:', error);
        return of([]); 
      })
    );
  }

  updateInterviewStatus(interviewId: number, newStatus: Statut): Observable<EntretienTechnique[]> {
    return this.http.put<EntretienTechnique[]>(`${this.baseUrl}/updateStatus/${interviewId}`, { status: newStatus });
  }

  updateReportedDateTime(interviewId: number, reportedDateTime: Date): Observable<EntretienTechnique> {
    return this.http.put<EntretienTechnique>(`${this.baseUrl}/updateReportedDateTime/${interviewId}`, { reportedDateTime });
  }
}
