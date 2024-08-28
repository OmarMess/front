import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from 'app/models/schedule.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseUrl = 'http://localhost:4049/api/schedules'
  


  constructor(private http: HttpClient) { }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.baseUrl, schedule)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 400) {
                    console.error('Bad Request:', error.error);
                } else if (error.status === 500) {
                    console.error('Internal Server Error:', error.error);
                } else {
                    console.error('Unknown Error:', error.error);
                }
                return throwError('Something went wrong; please try again later.');
            })
        );
} 

getSchedules(): Observable<Schedule[]> {
  return this.http.get<Schedule[]>(this.baseUrl);
}
getScheduleById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${id}`);
}

getSchedulesByEvaluatorId(evaluatorId: number): Observable<Schedule[]> {
  return this.http.get<Schedule[]>(`${this.baseUrl}/evaluator/${evaluatorId}`);
}
}


