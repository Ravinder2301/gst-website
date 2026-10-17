import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (profile$ | async; as response) {
      @if (response.profile.whatsapp) {
        <a class="whatsapp" [href]="whatsappUrl(response.profile.whatsapp)" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">WA</a>
      }
    }
  `,
  styles: [`
    .whatsapp{position:fixed;right:22px;bottom:22px;z-index:60;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;text-decoration:none;background:#1f7a4c;color:#fff;font-weight:800;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.2);border:4px solid #fff}.whatsapp:hover{transform:translateY(-2px)}
  `]
})
export class WhatsappButtonComponent {
  private readonly profileService = inject(ProfileService);
  readonly profile$ = this.profileService.getProfile();
  whatsappUrl(number: string) { return `https://wa.me/${number.replace(/\D/g, '')}`; }
}
