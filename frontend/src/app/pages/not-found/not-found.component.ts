import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({selector:'app-not-found',standalone:true,imports:[RouterLink],template:`<main class="not-found"><div><div class="eyebrow">404</div><h1>Page not found</h1><p>The page you're looking for doesn't exist.</p><a routerLink="/">Return home →</a></div></main>`,styles:[`.not-found{min-height:65vh;display:grid;place-items:center;padding:70px}.not-found h1{font-family:Georgia,serif;font-size:56px;margin:15px 0}.not-found p{color:#777}.not-found a{color:#9a7640;text-decoration:none;font-weight:700}.eyebrow{font-size:11px;letter-spacing:.16em;font-weight:800;color:#9a7640}`]})
export class NotFoundComponent {}
