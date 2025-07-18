//  user service to get user id and name

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })  
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mindcare_jwt')}`
      }
    });
  }

  getUserId(): Observable<string> {
    return this.getUser().pipe(map((user: any) => user.id));
  }
}

