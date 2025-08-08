import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { CLAIM_STATUS, CLAIM_STATUS_COLOR, StatusClaim } from '../../../core/consts/claims';

@Component({
  selector: 'app-claims-detail',
  imports: [
    ButtonModule,
    CardModule,
    TimelineModule,
    TagModule,

  ],
  templateUrl: './claims-detail.html',
  styleUrl: './claims-detail.scss'
})
export class ClaimsDetail {
  files: any[] = [];

  router: Router = inject(Router);
  statusHistory = signal([
    { status: 'pending', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'info', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'approved', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  ])

  handleGoToList() {
    this.router.navigate(['/app/claims']);
  }

  getSeverityHumanized(status: StatusClaim) {
    return CLAIM_STATUS[status];
  }

  getSeverityColor(status: StatusClaim) {
    return CLAIM_STATUS_COLOR[status];
  }
}
