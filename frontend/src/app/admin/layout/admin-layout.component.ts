import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <button class="mobile-toggle" type="button" (click)="sidebarOpen = !sidebarOpen">☰</button>
      <div class="backdrop" *ngIf="sidebarOpen" (click)="sidebarOpen=false"></div>
      <aside class="sidebar" [class.open]="sidebarOpen">
        <div class="brand">
          <div class="brand-mark">GST</div>
          <div><strong>Tax Admin</strong><small>Management Panel</small></div>
        </div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active" (click)="sidebarOpen=false">⌂ <span>Dashboard</span></a>
          <a routerLink="/admin/inquiries" routerLinkActive="active" (click)="sidebarOpen=false">▤ <span>Inquiries</span></a>
          <a routerLink="/admin/services" routerLinkActive="active" (click)="sidebarOpen=false">▣ <span>Services</span></a>
          <a routerLink="/admin/profile" routerLinkActive="active" (click)="sidebarOpen=false">◎ <span>Profile</span></a>
        </nav>
        <div class="sidebar-bottom">
          <div class="admin-user" *ngIf="auth.getAdmin() as admin"><strong>{{ admin.name }}</strong><span>{{ admin.email }}</span></div>
          <button class="logout" (click)="auth.logout()">↪ <span>Logout</span></button>
        </div>
      </aside>
      <main class="admin-main">
        <header class="topbar"><div><span class="eyebrow">ADMIN PANEL</span><h1>Business Management</h1></div><a routerLink="/" target="_blank" class="view-site">View website ↗</a></header>
        <section class="content"><router-outlet /></section>
      </main>
    </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.admin-shell{min-height:100vh;background:#f5f7fa;color:#1f2937}.sidebar{position:fixed;inset:0 auto 0 0;width:250px;background:#123b5d;color:#fff;padding:24px 16px;display:flex;flex-direction:column;z-index:20}.brand{display:flex;gap:12px;align-items:center;padding:4px 8px 28px;border-bottom:1px solid rgba(255,255,255,.14)}.brand-mark{width:42px;height:42px;border-radius:12px;background:#d4a017;display:grid;place-items:center;font-weight:800;color:#123b5d}.brand strong,.brand small{display:block}.brand small{font-size:11px;opacity:.7;margin-top:3px}.sidebar nav{display:grid;gap:6px;padding-top:22px}.sidebar nav a,.logout{border:0;background:transparent;color:#e9f1f7;text-decoration:none;padding:12px 14px;border-radius:10px;text-align:left;display:flex;gap:12px;align-items:center;font-size:14px;cursor:pointer}.sidebar nav a.active,.sidebar nav a:hover,.logout:hover{background:rgba(255,255,255,.12)}.sidebar-bottom{margin-top:auto}.admin-user{padding:12px 14px;margin-bottom:8px;background:rgba(255,255,255,.07);border-radius:10px}.admin-user strong,.admin-user span{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.admin-user span{font-size:11px;opacity:.7;margin-top:3px}.admin-main{margin-left:250px;min-height:100vh}.topbar{height:82px;background:#fff;border-bottom:1px solid #e5e7eb;padding:0 32px;display:flex;align-items:center;justify-content:space-between}.eyebrow{font-size:10px;letter-spacing:2px;color:#1f6f8b;font-weight:800}.topbar h1{font-size:22px;margin:4px 0 0}.view-site{font-size:13px;color:#123b5d;text-decoration:none;font-weight:700}.content{padding:30px}.mobile-toggle{display:none}.backdrop{display:none}@media(max-width:800px){.sidebar{transform:translateX(-100%);transition:.2s}.sidebar.open{transform:translateX(0)}.admin-main{margin-left:0}.mobile-toggle{display:block;position:fixed;top:20px;left:18px;z-index:30;border:0;background:#123b5d;color:#fff;border-radius:9px;width:40px;height:40px;font-size:20px}.backdrop{display:block;position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:15}.topbar{padding-left:75px}.content{padding:20px}}
  `]
})
export class AdminLayoutComponent { protected readonly auth = inject(AuthService); sidebarOpen = false; }
