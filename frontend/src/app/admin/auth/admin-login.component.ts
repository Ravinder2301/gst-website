import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector:'app-admin-login', standalone:true, imports:[CommonModule,ReactiveFormsModule],
  template:`
    <main class="login-page"><section class="login-card">
      <div class="mark">GST</div><span class="eyebrow">SECURE ADMIN ACCESS</span><h1>Welcome back</h1><p>Sign in to manage your profile, services and inquiries.</p>
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <label>Email<input type="email" formControlName="email" placeholder="admin@example.com" autocomplete="username"></label>
        <small class="error" *ngIf="form.controls.email.touched && form.controls.email.invalid">Enter a valid email address.</small>
        <label>Password<input type="password" formControlName="password" placeholder="••••••••" autocomplete="current-password"></label>
        <small class="error" *ngIf="form.controls.password.touched && form.controls.password.invalid">Password is required.</small>
        <div class="api-error" *ngIf="error">{{ error }}</div><button [disabled]="loading || form.invalid">{{ loading ? 'Signing in…' : 'Login' }}</button>
      </form><a class="back" href="/">← Back to website</a>
    </section></main>
  `,
  styles:[`:host{display:block}.login-page{min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#f7f9fc,#eef4f7);padding:24px}.login-card{width:min(440px,100%);background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:38px;box-shadow:0 20px 60px rgba(18,59,93,.1)}.mark{width:50px;height:50px;border-radius:14px;background:#123b5d;color:#d4a017;display:grid;place-items:center;font-weight:800;margin-bottom:25px}.eyebrow{font-size:10px;letter-spacing:2px;color:#1f6f8b;font-weight:800}.login-card h1{font-size:32px;margin:8px 0}.login-card p{color:#6b7280;line-height:1.6;margin-bottom:26px}.login-card form{display:grid;gap:9px}.login-card label{font-size:13px;font-weight:700;display:grid;gap:7px}.login-card input{padding:13px 14px;border:1px solid #d8dee5;border-radius:10px;font:inherit;font-weight:400;outline:0}.login-card input:focus{border-color:#1f6f8b;box-shadow:0 0 0 3px rgba(31,111,139,.1)}.login-card button{margin-top:10px;padding:14px;border:0;border-radius:10px;background:#123b5d;color:#fff;font-weight:800;cursor:pointer}.login-card button:disabled{opacity:.55;cursor:not-allowed}.error,.api-error{color:#b42318;font-size:12px}.api-error{padding:10px;background:#fff1f0;border-radius:8px}.back{display:block;text-align:center;margin-top:22px;color:#123b5d;text-decoration:none;font-size:13px}`]
})
export class AdminLoginComponent {
  private readonly fb=inject(FormBuilder); private readonly auth=inject(AuthService); private readonly router=inject(Router);
  loading=false; error=''; form=this.fb.nonNullable.group({email:['',[Validators.required,Validators.email]],password:['',[Validators.required]]});
  submit(){if(this.form.invalid){this.form.markAllAsTouched();return}this.loading=true;this.error='';this.auth.login(this.form.controls.email.value,this.form.controls.password.value).subscribe({next:()=>this.router.navigate(['/admin/dashboard']),error:e=>{this.error=e?.error?.message||'Unable to login. Please check your credentials.';this.loading=false},complete:()=>this.loading=false});}
}
