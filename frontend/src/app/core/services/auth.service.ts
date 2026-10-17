import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

export interface AdminUser { id: string; name: string; email: string; role: string; }
export interface LoginResponse { success: boolean; message: string; token: string; admin: AdminUser; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly tokenKey = 'admin_token';
  private readonly adminKey = 'admin_user';

  login(email: string, password: string): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('/auth/login', { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem(this.tokenKey, response.token);
        sessionStorage.setItem(this.adminKey, JSON.stringify(response.admin));
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.adminKey);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey) || localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean { return !!this.getToken(); }

  getAdmin(): AdminUser | null {
    const raw = sessionStorage.getItem(this.adminKey) || localStorage.getItem(this.adminKey);
    if (!raw) return null;
    try { return JSON.parse(raw) as AdminUser; } catch { return null; }
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<{ success: boolean; message: string }> {
    return this.api.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }
}
