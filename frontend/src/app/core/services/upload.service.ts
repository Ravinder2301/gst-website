import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface UploadResponse { success: boolean; message: string; url: string; filename: string; }

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly api = inject(ApiService);
  uploadLogo(file: File): Observable<UploadResponse> { return this.api.postForm<UploadResponse>('/upload/logo', file); }
  uploadProfile(file: File): Observable<UploadResponse> { return this.api.postForm<UploadResponse>('/upload/profile', file); }
}
