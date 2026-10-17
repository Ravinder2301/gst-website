import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <header class="mobile-header"><button class="menu-btn" (click)="open=!open">☰</button><strong>Admin Panel</strong></header>
      <aside class="sidebar" [class.open]="open">
        <div class="brand"><span>GST</span><strong>Tax Admin</strong></div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active" (click)="open=false">Dashboard</a>
          <a routerLink="/admin/inquiries" routerLinkActive="active" (click)="open=false">Inquiries</a>
          <a routerLink="/admin/services" routerLinkActive="active" (click)="open=false">Services</a>
          <a routerLink="/admin/profile" routerLinkActive="active" (click)="open=false">Profile</a>
        </nav>
        <button class="logout" (click)="logout()">↪ Logout</button>
      </aside>
      <main class="admin-main"><router-outlet /></main>
    </div>
  `,
  styles: [`
    :host{display:block}.admin-shell{min-height:100vh;background:#f6f8fb;color:#17202a}.sidebar{position:fixed;left:0;top:0;bottom:0;width:245px;background:#123b5d;color:#fff;padding:24px 16px;display:flex;flex-direction:column;z-index:20}.brand{display:flex;align-items:center;gap:10px;padding:4px 10px 28px;font-size:18px}.brand span{display:grid;place-items:center;width:40px;height:40px;border-radius:10px;background:#d4a017;color:#123b5d;font-weight:800}.sidebar nav{display:grid;gap:6px}.sidebar nav a,.logout{border:0;background:transparent;color:#dce8f1;text-align:left;text-decoration:none;padding:12px 14px;border-radius:9px;font:inherit;cursor:pointer}.sidebar nav a:hover,.sidebar nav a.active{background:rgba(255,255,255,.12);color:#fff}.logout{margin-top:auto}.logout:hover{background:rgba(255,255,255,.12)}.admin-main{margin-left:245px;min-height:100vh}.mobile-header{display:none}@media(max-width:760px){.sidebar{transform:translateX(-100%);transition:.2s}.sidebar.open{transform:translateX(0)}.admin-main{margin-left:0;padding-top:58px}.mobile-header{display:flex;position:fixed;top:0;left:0;right:0;height:58px;background:#fff;border-bottom:1px solid #e5e7eb;align-items:center;gap:14px;padding:0 16px;z-index:15}.menu-btn{border:0;background:none;font-size:22px;cursor:pointer}}
  `]
})
export class AdminLayoutComponent { open=false; private readonly auth=inject(AuthService); private readonly router=inject(Router); logout(){this.auth.logout();this.router.navigate(['/admin/login']);} }
