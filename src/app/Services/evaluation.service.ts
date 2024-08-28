import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from 'app/models/evaluation.model'; 

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:4049/api/evaluations';

  constructor(private http: HttpClient) { }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}`);
  }

  getEvaluationsByEvaluatorEmail(email: string): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/evaluator/${email}`);
  }
  

  createEvaluation(evaluation: Evaluation, scheduleId: number): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.apiUrl}/${scheduleId}`, evaluation);
}

  
  getEvaluationById(id: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.apiUrl}/${id}`);
  }

  
  updateEvaluation(id: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.put<Evaluation>(`${this.apiUrl}/${id}`, evaluation);
  }

  
  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEvaluationsByEvaluator(evaluatorId: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/evaluator/${evaluatorId}`);
  }

  downloadReport(evaluationId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${evaluationId}/report`, { responseType: 'blob' });
  }


  getProfileCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/count`);
  }
  
  getStateCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/state-count`);
  }
}
