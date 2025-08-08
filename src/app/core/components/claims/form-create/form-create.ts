import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './form-create.html',
  styles: ``,
})
export class FormCreate {

  dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  dDConfig: DynamicDialogConfig = inject(DynamicDialogConfig);

  formSubmitted = signal(false);
  isLoadingForm = signal(false);
  uploadedFiles: any[] = [];

  createClaimForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    business: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email_client: new FormControl('', [Validators.required, Validators.email]),
  })

  onSubmit() {
    this.formSubmitted.set(true);
    if (!this.createClaimForm.valid) return;
    this.isLoadingForm.set(true);
    console.log(this.createClaimForm.value);
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
