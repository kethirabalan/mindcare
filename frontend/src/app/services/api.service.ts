import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  addMood(mood: { level: number; notes: string;}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/moods`, mood, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mindcare_jwt')}`
      }
    });
  }

  addMoodWithUserId(moodForm: { level: number; notes: string }, userId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/moods`, {
      mood: moodForm.level,
      userId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mindcare_jwt')}`
      }
    });
  }


  getMyMoods(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/moods`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mindcare_jwt')}`
      }
    });
  }

  getMoods(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/moods`);
  }
} 