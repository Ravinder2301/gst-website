import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface Profile {
  _id?: string;
  name: string;
  businessName: string;
  designation: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  about: string;
  experience: string;
  qualification: string;
  mission: string;
  vision: string;
  logo?: string;
  profileImage?: string;
  socialLinks?: SocialLinks;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly api = inject(ApiService);

  getProfile(): Observable<{ success: boolean; profile: Profile }> {
    return this.api.get('/profile');
  }
}
