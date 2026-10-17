import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Profile } from './profile.service';
import { TaxService } from './service.service';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';
export interface InquiryServiceRef { _id: string; title: string; slug: string; }
export interface Inquiry {
  _id: string; name: string; phone: string; email: string; service: string | InquiryServiceRef;
  message: string; status: InquiryStatus; createdAt: string; updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  private readonly api = inject(ApiService);

  getInquiries(): Observable<{success: boolean; count: number; inquiries: Inquiry[]}> { return this.api.get('/inquiries'); }
  getInquiry(id: string): Observable<{success: boolean; inquiry: Inquiry}> { return this.api.get(`/inquiries/${id}`); }
  updateInquiry(id: string, body: Partial<Inquiry>): Observable<{success: boolean; message: string; inquiry: Inquiry}> { return this.api.put(`/inquiries/${id}`, body); }
  deleteInquiry(id: string): Observable<{success: boolean; message: string}> { return this.api.delete(`/inquiries/${id}`); }

  getServices(includeInactive = true): Observable<{success: boolean; count: number; services: TaxService[]}> { return this.api.get('/services'); }
  createService(body: TaxService): Observable<{success: boolean; message: string; service: TaxService}> { return this.api.post('/services', body); }
  updateService(id: string, body: TaxService): Observable<{success: boolean; message: string; service: TaxService}> { return this.api.put(`/services/${id}`, body); }
  deleteService(id: string): Observable<{success: boolean; message: string}> { return this.api.delete(`/services/${id}`); }
  setServiceStatus(id: string, isActive: boolean): Observable<{success: boolean; message: string; service: TaxService}> { return this.api.patch(`/services/${id}/status`, { isActive }); }

  updateProfile(body: Profile): Observable<{success: boolean; message: string; profile: Profile}> { return this.api.put('/profile', body); }
}
