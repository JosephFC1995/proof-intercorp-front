import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { StringUtils } from '../../../utils/string';
import { EditorModule } from 'primeng/editor';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { Claim } from '../../../types/claims';
import { ClaimService } from '../../../services/claim.service/claim.service';
import { FileUtils } from '../../../utils/file';
import { ToastService } from '../../../services/toast-service/toast-service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-form-create',
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    MessageModule,
    TextareaModule,
    FileUploadModule,
    EditorModule,
  ],
  templateUrl: './form-create.html',
  styles: ``,
})
export class FormCreate {

  dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  dDConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  stringUtils: StringUtils = inject(StringUtils);
  queryClient = inject(QueryClient);
  claimService: ClaimService = inject(ClaimService);
  toastService: ToastService = inject(ToastService);

  formSubmitted = signal(false);
  isLoadingForm = signal(false);
  uploadedFiles: any[] = [];

  prefix = computed(() => environment.PREFIX_CODE);

  createClaimForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    business: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email_client: new FormControl('', [Validators.required, Validators.email]),
  })

  mutationUpload = injectMutation(() => ({
    mutationFn: ({ code, file }: { code: string, file: File }) => this.claimService.uploadFileToClaim(code, file),
    onSuccess: () => {},
    onError: (error, variables, context) => {
      this.isLoadingForm.set(false);
      const e = error as any;
      const message = JSON.stringify(e?.error?.errors);
      this.toastService.showErrorToast('Error al subir el archivo', 'Ha ocurrido un error al subir el archivo <<' + message + '>>');
    },
  }))

  mutation = injectMutation(() => ({
    mutationFn: (claim: Pick<Claim, 'code' | 'business' | 'reason' | 'description' | 'email_client'>) => this.claimService.createClaim(claim),
    onSuccess: (data, variables, context) => {
      const promises: Promise<any>[] = [];
      this.uploadedFiles.map(file => promises.push(this.mutationUpload.mutateAsync({ code: data.code, file })));
      Promise.all(promises).then(() => {
        this.toastService.showSuccessToast('Reclamo creado', 'El reclamo se creó correctamente');
        this.dialogRef.close(true);
      });
    },
    onError: (error, variables, context) => {
      this.isLoadingForm.set(false);
      const e = error as any;
      const message = JSON.stringify(e?.error?.errors);
      this.toastService.showErrorToast('Error al crear el reclamo', 'Ha ocurrido un error al crear el reclamo <<' + message + '>>');
    },
  }))


  ngOnInit() {
    const code = this.stringUtils.generateRandomString(this.prefix(), 10, 'alphanumeric', 'upper');
    this.createClaimForm.get('code')?.setValue(code);
  }

  onSubmit() {
    this.formSubmitted.set(true);
    if (!this.createClaimForm.valid) return;
    this.isLoadingForm.set(true);
    const { code, business, reason, description, email_client } = this.createClaimForm.value;
    this.mutation.mutate({
      code: code,
      business,
      reason,
      description,
      email_client,
    } as Claim)
  }

  onUpload(event: any) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  isInvalid(controlName: string) {
    const control = this.createClaimForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }
}
