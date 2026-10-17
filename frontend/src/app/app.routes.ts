import { Routes } from '@angular/router';
import { PageShellComponent } from './shared/components/page-shell.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { AdminLoginComponent } from './admin/auth/admin-login.component';

export const routes: Routes = [
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminLayoutComponent, canActivate: [authGuard], children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', loadComponent: () => import('./admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
    { path: 'inquiries', loadComponent: () => import('./admin/inquiries/admin-inquiries.component').then(m => m.AdminInquiriesComponent) },
    { path: 'services', loadComponent: () => import('./admin/services/admin-services.component').then(m => m.AdminServicesComponent) },
    { path: 'profile', loadComponent: () => import('./admin/profile/admin-profile.component').then(m => m.AdminProfileComponent) }
  ]},
  { path: '', component: PageShellComponent, children: [
    { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
    { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
    { path: 'services/:slug', loadComponent: () => import('./pages/service-detail/service-detail.component').then(m => m.ServiceDetailComponent) },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
  ]}
];
