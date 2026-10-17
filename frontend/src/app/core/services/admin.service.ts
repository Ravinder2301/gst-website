import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TaxService } from './service.service';
import { Profile } from './profile.service';

export interface Inquiry {
  _id: string; name: string; phone: string; email: string; service: string | { _id: string; title: string; slug: string };
  message: string; status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled'; createdAt: string; updatedAt: string;
}
export interface InquiryListResponse { success: boolean; count: number; inquiries: Inquiry[]; }

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly api = inject(ApiService);

  getInquiries(): Observable<InquiryListResponse> { return this.api.get('/inquiries'); }
  getInquiry(id: string): Observable<{ success: boolean; inquiry: Inquiry }> { return this.api.get(`/inquiries/${id}`); }
  updateInquiry(id: string, data: Partial<Inquiry>): Observable<{ success: boolean; message: string; inquiry: Inquiry }> { return this.api.put(`/inquiries/${id}`, data); }
  deleteInquiry(id: string): Observable<{ success: boolean; message: string }> { return this.api.delete(`/inquiries/${id}`); }

  getServices(): Observable<{ success: boolean; count: number; services: TaxService[] }> { return this.api.get('/services'); }
  createService(data: TaxService): Observable<{ success: boolean; message: string; service: TaxService }> { return this.api.post('/services', data); }
  updateService(id: string, data: TaxService): Observable<{ success: boolean; message: string; service: TaxService }> { return this.api.put(`/services/${id}`, data); }
  deleteService(id: string): Observable<{ success: boolean; message: string }> { return this.api.delete(`/services/${id}`); }
  updateServiceStatus(id: string, isActive: boolean): Observable<{ success: boolean; message: string; service: TaxService }> { return this.api.patch(`/services/${id}/status`, { isActive }); }

  getProfile(): Observable<{ success: boolean; profile: Profile | null }> { return this.api.get('/profile'); }
  updateProfile(data: Partial<Profile>): Observable<{ success: boolean; message: string; profile: Profile }> { return this.api.put('/profile', data); }
  uploadImage(type: 'logo' | 'profile', file: File): Observable<{ success: boolean; message: string; url: string }> {
    const form = new FormData(); form.append('image', file);
    return this.api.post(`/upload/${type}`, form);
  }
}
