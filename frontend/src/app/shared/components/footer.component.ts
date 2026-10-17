import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <div class="footer-brand">{{ (profile$ | async)?.profile?.businessName || 'Tax & GST Services' }}</div>
          <p>Professional GST, income tax, accounting and compliance support for individuals and businesses.</p>
        </div>
        <div><h4>Quick Links</h4><a routerLink="/about">About</a><a routerLink="/services">Services</a><a routerLink="/contact">Contact</a></div>
        <div><h4>Contact</h4><p>{{ (profile$ | async)?.profile?.phone || 'Contact us for details' }}</p><p>{{ (profile$ | async)?.profile?.email || '' }}</p><p>{{ (profile$ | async)?.profile?.address || '' }}</p></div>
      </div>
      <div class="container copyright">© {{ year }} {{ (profile$ | async)?.profile?.businessName || 'Tax & GST Services' }}. All rights reserved.</div>
    </footer>
  `,
  styles: [`
    .footer{background:#171615;color:#e9e6df;margin-top:80px}.footer-grid{display:grid;grid-template-columns:1.7fr .8fr 1.2fr;gap:60px;padding:64px 0 50px}.footer-brand{font-family:Georgia,serif;font-size:24px;margin-bottom:15px}.footer p{color:#aaa7a0;line-height:1.7;margin:0 0 7px;max-width:440px}.footer h4{font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:#c5a46d;margin:3px 0 16px}.footer a{display:block;color:#aaa7a0;text-decoration:none;margin:0 0 10px}.footer a:hover{color:#fff}.copyright{border-top:1px solid #333;padding:20px 0;color:#777;font-size:12px}@media(max-width:720px){.footer-grid{grid-template-columns:1fr;gap:32px;padding:45px 0 35px}}
  `]
})
export class FooterComponent {
  private readonly profileService = inject(ProfileService);
  readonly profile$ = this.profileService.getProfile();
  readonly year = new Date().getFullYear();
}
