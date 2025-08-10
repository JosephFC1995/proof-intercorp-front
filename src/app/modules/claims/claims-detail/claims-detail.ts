import { Component, computed, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { CLAIM_STATUS, CLAIM_STATUS_COLOR, StatusClaim } from '../../../core/consts/claims';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { ClaimService } from '../../../core/services/claim.service/claim.service';
import { Claim, ClaimDetail, FileClaim } from '../../../core/types/claims';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { FileUtils } from '../../../core/utils/file';
import { environment } from '../../../../environments/environment.development';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormUpdateStatus } from '../../../core/components/claims/form-update-status/form-update-status';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-claims-detail',
  imports: [
    ButtonModule,
    CardModule,
    TimelineModule,
    TagModule,
    CommonModule,
    AccordionModule,
    SkeletonModule,
  ],
  templateUrl: './claims-detail.html',
  styleUrl: './claims-detail.scss',
  providers: [
    DialogService,
  ]
})
export class ClaimsDetail {
  queryClient = inject(QueryClient);
  claimService: ClaimService = inject(ClaimService);
  route: ActivatedRoute = inject(ActivatedRoute);
  fileUtils: FileUtils = inject(FileUtils);
  dialogRef?: DynamicDialogRef = undefined;
  dialogService: DialogService = inject(DialogService);
  messageService: MessageService = inject(MessageService);

  claimId: Signal<string | null> = computed(() => this.route.snapshot.paramMap.get('id'));

  domainFile = computed(() => `${environment.URL_STORAGE}/`);

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
    retry: 2,
  }))


  isLoading = computed(() => this.query.isFetching() || this.query.isLoading());
  claim: Signal<ClaimDetail> = computed(() => this.query.data() || ({} as ClaimDetail));
  error = computed(() => this.query.error());
  isError = computed(() => this.query.isError());

  claimCode = computed(() => this.claim()?.code);

  queryFiles = injectQuery(() => ({
    queryKey: ['files', this.claimId()],
    queryFn: () => this.claimService.getFilesToClaim(this.claim().code),
    gcTime: 0,
    enabled: !!this.claimCode(),
  }))

  filesClaim: Signal<FileClaim[]> = computed(() => this.queryFiles.data() || ([] as FileClaim[]));

  handleGoToList() {
    this.router.navigate(['/app/claims']);
  }

  getSeverityHumanized(status: string) {
    return CLAIM_STATUS[status as StatusClaim];
  }

  getSeverityColor(status: string) {
    return CLAIM_STATUS_COLOR[status as StatusClaim];
  }

  transformBytes(bytes: number) {
    return this.fileUtils.bytesToMb(bytes);
  }

  handleChangeStatusClaim() {
    if (!this.dialogService) return;
    this.dialogRef = this.dialogService.open(FormUpdateStatus, {
      header: 'Actualizar estado',
      width: '32rem',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        claim_id: this.claimId(),
      }
    });

    this.dialogRef.onClose.subscribe((response) => {
      if (response) {
        this.query.refetch();
      }
    });
  }
}
