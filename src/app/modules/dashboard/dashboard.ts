import { Component, computed, inject, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ItemSelect, ResponsePagination } from '../../core/types/global';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormCreate } from '../../core/components/claims/form-create/form-create';
import { Router } from "@angular/router";
import { CLAIM_STATUS, CLAIM_STATUS_COLOR, StatusClaim } from '../../core/consts/claims';
import { ClaimService } from '../../core/services/claim.service/claim.service';
import { injectQuery, keepPreviousData, QueryClient } from '@tanstack/angular-query-experimental';
import { CommonModule } from '@angular/common';
import { Claim } from '../../core/types/claims';
import { PaginatorModule } from 'primeng/paginator';
import { DateUtils } from '../../core/utils/date';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    DatePickerModule,
    TagModule,
    CommonModule,
    PaginatorModule,
    TooltipModule,
  ],
  providers: [
    DialogService
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  dialogRef?: DynamicDialogRef = undefined;
  dialogService: DialogService = inject(DialogService);
  router: Router = inject(Router);
  claimService: ClaimService = inject(ClaimService);
  queryClient = inject(QueryClient)
  dateUtils: DateUtils = inject(DateUtils);

  filterForm = new FormGroup({
    business: new FormControl(),
    status: new FormControl(),
    date: new FormControl(),
  })

  businessFilter = signal('');
  statusFilter = signal('');
  dateFilter = signal('');
  pageSize = signal(10);
  page = signal(0);

  // TODO: Integrate service for data
  statusList: ItemSelect[] = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Aprobado', value: 'approved' },
    { label: 'Rechazado', value: 'rejected' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  query = injectQuery(() => ({
    queryKey: ['claims', this.pageSize(), this.page(), this.businessFilter(), this.statusFilter(), this.dateFilter()],
    queryFn: () => this.claimService.getClaims({
      pageSize: this.pageSize(),
      page: this.page() + 1,
      ...((this.businessFilter() && this.businessFilter().length > 0) ? { business: this.businessFilter() } : undefined),
      ...((this.statusFilter() && this.statusFilter().length > 0) ? { status: this.statusFilter() } : undefined),
      ...((this.dateFilter() && this.dateFilter().length > 0) ? { date: this.dateFilter() } : undefined),
    }),
    placeholderData: keepPreviousData,
    gcTime: 0,
  }))

  isLoading = computed(() => this.query.isFetching() || this.query.isLoading());
  claims: Signal<Claim[]> = computed(() => this.query.data()?.items || ([] as Claim[]));

  onSubmit() {
    const { business, status, date } = this.filterForm.value;
    this.businessFilter.set(business?.trim());
    this.statusFilter.set(status);
    if (date) {
      this.dateFilter.set(this.dateUtils.format(new Date(date), 'yyyy-MM-dd'));
    } else {
      this.dateFilter.set('');
    }
  }

  getSeverityHumanized(status: StatusClaim) {
    return CLAIM_STATUS[status];
  }

  getSeverityColor(status: StatusClaim) {
    return CLAIM_STATUS_COLOR[status];
  }

  handleOpenModalCreateClaim() {
    if (!this.dialogService) return;
    this.dialogRef = this.dialogService.open(FormCreate, {
      header: 'Crear nuevo reclamo',
      width: '32rem',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });

    this.dialogRef.onClose.subscribe((response) => {
      if (response) {
        this.query.refetch();
      }
    });
  }

  handleGoToClaim(id: string) {
    this.router.navigate(['/app/claims', id]);
  }

  onPageChange(event: any) {
    this.page.set(event?.page);
    this.pageSize.set(event?.rows);
  }
}
