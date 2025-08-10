import { Component, computed, inject, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemSelect } from '../../../types/global';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { ClaimService } from '../../../services/claim.service/claim.service';
import { StatusClaim } from '../../../types/claims';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ToastService } from '../../../services/toast-service/toast-service';

type StatusClaimRequest = Partial<Pick<StatusClaim, 'status' | 'comment_adviser' | 'email_adviser'>>

@Component({
  selector: 'app-form-update-status',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    MessageModule,
    TextareaModule,
    ToastModule,
  ],
  templateUrl: './form-update-status.html',
  styles: ``,
  providers: []
})
export class FormUpdateStatus {
  dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  dDConfig: DynamicDialogConfig = inject(DynamicDialogConfig);

  formSubmitted = signal(false);
  isLoadingForm = signal(false);
  queryClient = inject(QueryClient);
  claimService: ClaimService = inject(ClaimService);
  toastService: ToastService = inject(ToastService);

  // TODO: Integrate service for data
  statusList: ItemSelect[] = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Aprobado', value: 'approved' },
    { label: 'Rechazado', value: 'rejected' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  claimId: Signal<string | null> = computed(() => this.dDConfig.data?.claim_id);

  statusForm = new FormGroup({
    status: new FormControl(null, [Validators.required]),
    commentAdviser: new FormControl(),
    emailAdviser: new FormControl('', [Validators.email, Validators.required]),
  })

  mutation = injectMutation(() => ({
    mutationFn: (status: StatusClaimRequest) => this.claimService.updateStatusClaim(this.claimId() || '', status.status, status.comment_adviser, status.email_adviser),
    onSuccess: () => {
      this.toastService.showSuccessToast('Estado actualizado', 'El estado se actualizó correctamente');
      this.dialogRef.close(true);
    },
    onError: (error, variables, context) => {
      this.isLoadingForm.set(false);
      const e = error as any;
      const message = JSON.stringify(e?.error?.errors);
      this.toastService.showErrorToast('Error al actualizar el estado', 'Ha ocurrido un error al actualizar el estado <<' + message + '>>');
    },
  }))


  onSubmit() {
    this.formSubmitted.set(true);
    if (!this.statusForm.valid) return;
    this.isLoadingForm.set(true);
    const { status, commentAdviser, emailAdviser } = this.statusForm.value;
    this.mutation.mutate({
      status,
      comment_adviser: commentAdviser,
      email_adviser: emailAdviser,
    } as StatusClaimRequest)
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }


  isInvalid(controlName: string) {
    const control = this.statusForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

}
