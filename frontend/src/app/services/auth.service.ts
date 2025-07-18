import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private jwtKey = 'mindcare_jwt';
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(this.jwtKey, res.token);
          this.authState.next(true);
        }
      })
    );
  }

  register(credentials: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(this.jwtKey, res.token);
          this.authState.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.jwtKey);
    this.authState.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.jwtKey);
  }

  getUserId(): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/api/auth/user`);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.jwtKey);
  }
} 