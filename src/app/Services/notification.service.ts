import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from 'app/models/notification.model';

@Injectable({
providedIn: 'root'
})
export class NotificationService {

private baseUrl = 'http://localhost:4049/api/notifications';

constructor(private http: HttpClient) { }

getNotifications(evaluatorId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/${evaluatorId}`);
  }
}


