import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface ServiceFaq { question: string; answer: string; }
export interface TaxService {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  benefits?: string[];
  documents?: string[];
  process?: string[];
  faqs?: ServiceFaq[];
  isActive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private readonly api = inject(ApiService);

  getServices(): Observable<{ success: boolean; services: TaxService[] }> {
    return this.api.get('/services');
  }

  getService(slug: string): Observable<{ success: boolean; service: TaxService }> {
    return this.api.get(`/services/${encodeURIComponent(slug)}`);
  }
}
