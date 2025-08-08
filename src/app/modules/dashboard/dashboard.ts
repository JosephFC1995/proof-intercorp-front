import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ItemSelect } from '../../core/types/global';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TagModule } from 'primeng/tag';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormCreate } from '../../core/components/claims/form-create/form-create';
import { Router } from "@angular/router";
import { CLAIM_STATUS, CLAIM_STATUS_COLOR, StatusClaim } from '../../core/consts/claims';

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

  filterForm = new FormGroup({
    business: new FormControl('',),
    status: new FormControl(),
    date: new FormControl(),
  })

  // TODO: Integrate service for data
  statusFilter: ItemSelect[] = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Aprobado', value: 'approved' },
    { label: 'Rechazado', value: 'rejected' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  claims = signal([
    {
      code: 'A',
      name: 'Apple',
      category: 'Fruits',
      quantity: 3,
      status: 'pending',
    },
    {
      code: 'B',
      name: 'Banana',
      category: 'Fruits',
      quantity: 2,
      status: 'approved',
    },
    {
      code: 'C',
      name: 'Cherry',
      category: 'Fruits',
      quantity: 5,
      status: 'rejected',
    },
    {
      code: 'D',
      name: 'Durian',
      category: 'Fruits',
      quantity: 4,
      status: 'cancelled',
    },
    {
      code: 'E',
      name: 'Elderberry',
      category: 'Fruits',
      quantity: 3,
      status: 'pending',
    },
    {
      code: 'F',
      name: 'Fig',
      category: 'Fruits',
      quantity: 3,
      status: 'approved',
    },
    {
      code: 'G',
      name: 'Grape',
      category: 'Fruits',
      quantity: 3,
      status: 'rejected',
    },
    {
      code: 'H',
      name: 'Honeydew',
      category: 'Fruits',
      quantity: 3,
      status: 'cancelled',
    },
    {
      code: 'I',
      name: 'Iris',
      category: 'Fruits',
      quantity: 3,
      status: 'pending',
    },
    {
      code: 'J',
      name: 'Jackfruit',
      category: 'Fruits',
      quantity: 3,
      status: 'approved',
    },

  ]);

  onSubmit() {
    console.log(this.filterForm.value);
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
        console.log('Dialog was closed with a value: ' + response);
      }
    });
  }

  handleGoToClaim(id: string) {
    console.log(id);
    this.router.navigate(['/app/claims', id]);
  }
}
