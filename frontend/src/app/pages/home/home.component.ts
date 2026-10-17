import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, map, of, shareReplay } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { ServiceService } from '../../core/services/service.service';

@Component({
  selector: 'app-home', standalone: true, imports: [AsyncPipe, RouterLink],
  templateUrl: './home.component.html', styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly profileService = inject(ProfileService);
  private readonly serviceService = inject(ServiceService);
  readonly profile$ = this.profileService.getProfile().pipe(catchError(() => of({success:false, profile:null as any})), shareReplay(1));
  readonly services$ = this.serviceService.getServices().pipe(map(r => r.services?.filter(s => s.isActive !== false).slice(0,6) ?? []), catchError(() => of([])), shareReplay(1));
}
