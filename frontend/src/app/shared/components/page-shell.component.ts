import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { WhatsappButtonComponent } from './whatsapp-button.component';

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent],
  template: `<app-header /><router-outlet /><app-whatsapp-button /><app-footer />`
})
export class PageShellComponent {}
