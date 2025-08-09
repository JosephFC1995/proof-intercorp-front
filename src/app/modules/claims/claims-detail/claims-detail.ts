import { Component, computed, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { CLAIM_STATUS, CLAIM_STATUS_COLOR, StatusClaim } from '../../../core/consts/claims';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { ClaimService } from '../../../core/services/claim.service/claim.service';
import { Claim, ClaimDetail } from '../../../core/types/claims';

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
  queryClient = inject(QueryClient);
  claimService: ClaimService = inject(ClaimService);
  route: ActivatedRoute = inject(ActivatedRoute);

  claimId: Signal<string | null> = computed(() => this.route.snapshot.paramMap.get('id'));

  files: any[] = [];

  router: Router = inject(Router);
  statusHistory = signal([
    { status: 'pending', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'info', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'approved', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  ])

  query = injectQuery(() => ({
    queryKey: ['claim', this.claimId()],
    queryFn: () => this.claimService.getClaim(this.claimId() || ''),
    gcTime: 0,
  }))

  isLoading = computed(() => this.query.isFetching() || this.query.isLoading());
  claim: Signal<ClaimDetail> = computed(() => this.query.data() || ({} as ClaimDetail));
  error = computed(() => this.query.error());
  isError = computed(() => this.query.isError());

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
