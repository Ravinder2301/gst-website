import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" routerLink="/" aria-label="Go to home">
          <ng-container *ngIf="(profile$ | async)?.profile as profile">
            
            <img
              *ngIf="profile.logo"
              class="brand-logo"
              [src]="profile.logo"
              alt="Business Logo"
            />

            <span class="brand-mark" *ngIf="!profile.logo">&amp;</span>

            <span>
              <strong>{{ profile.businessName || 'Tax & GST Services' }}</strong>
              <small>GST • TAX • ACCOUNTING</small>
            </span>

          </ng-container>
        </a>

        <button class="menu-button" type="button" aria-label="Toggle navigation" (click)="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>

        <nav class="main-nav" [class.open]="menuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen=false">Home</a>
          <a routerLink="/about" routerLinkActive="active" (click)="menuOpen=false">About</a>
          <a routerLink="/services" routerLinkActive="active" (click)="menuOpen=false">Services</a>
          <a routerLink="/contact" routerLinkActive="active" (click)="menuOpen=false">Contact</a>
          <a class="nav-cta" routerLink="/contact" (click)="menuOpen=false">Book a Consultation</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .site-header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
    .header-inner{height:76px;display:flex;align-items:center;justify-content:space-between;gap:28px}
    .brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--ink)}
    .brand-logo {
  width: 84px;
  height: 75px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
}

.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: #fff;
  font-family: Georgia, serif;
  font-size: 20px;
}
    .brand strong{display:block;font-family:Georgia,serif;font-size:16px;line-height:1.1}
    .brand small{display:block;margin-top:4px;color:var(--muted);font-size:9px;letter-spacing:.16em;font-weight:700}
    .main-nav{display:flex;align-items:center;gap:26px}
    .main-nav a{color:#555;text-decoration:none;font-size:14px;font-weight:650;transition:.2s}
    .main-nav a:hover,.main-nav a.active{color:var(--accent)}
    .main-nav .nav-cta{padding:11px 17px;border-radius:999px;background:var(--ink);color:#fff}
    .main-nav .nav-cta:hover{background:var(--accent);color:#fff}
    .menu-button{display:none;border:0;background:transparent;padding:8px}
    .menu-button span{display:block;width:24px;height:2px;background:var(--ink);margin:5px}
    @media(max-width:820px){.menu-button{display:block}.main-nav{position:absolute;left:0;right:0;top:76px;display:none;padding:18px 22px 24px;background:#fff;border-bottom:1px solid var(--line);box-shadow:0 15px 30px rgba(20,20,20,.08);flex-direction:column;align-items:stretch;gap:4px}.main-nav.open{display:flex}.main-nav a{padding:12px}.main-nav .nav-cta{text-align:center;margin-top:6px}}
  `]
})
export class HeaderComponent {
  private readonly profileService = inject(ProfileService);
  readonly profile$ = this.profileService.getProfile();
  menuOpen = false;
}
