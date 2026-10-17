import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface InquiryPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  whatsappUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class InquiryService {
  private readonly api = inject(ApiService);

  submit(payload: InquiryPayload): Observable<InquiryResponse> {
    return this.api.post<InquiryResponse>('/inquiries', payload);
  }
}
