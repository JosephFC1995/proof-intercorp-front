import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Claim, ClaimDetail, FileClaim } from '../../types/claims';
import { environment } from '../../../../environments/environment.development';
import { lastValueFrom } from 'rxjs'
import { ResponsePagination } from '../../types/global';

type Filter = {
  business?: string;
  status?: string;
  date?: string;
  pageSize?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private http: HttpClient = inject(HttpClient);

  getClaims(query: Filter) {
    return lastValueFrom(this.http.get<ResponsePagination<Claim>>(`${environment.API_URL}claims`, {
      params: {
        ...query,
      }
    }));
  }

  createClaim(claim: Pick<Claim, 'code' | 'business' | 'reason' | 'description' | 'email_client'>) {
    return lastValueFrom(this.http.post<Claim>(`${environment.API_URL}claims`, claim));
  }

  getClaim(claimId: string) {
    return lastValueFrom(this.http.get<ClaimDetail>(`${environment.API_URL}claims/${claimId}`));
  }

  updateStatusClaim(claimId: string, status?: string, comment_adviser?: string, email_adviser?: string) {
    return lastValueFrom(this.http.post<Claim>(`${environment.API_URL}claims/${claimId}/status`, { status, comment_adviser, email_adviser }));
  }

  uploadFileToClaim(claimId: string, file: File) {
    const form = new FormData();
    form.append('file', file, file.name);

    return lastValueFrom(this.http.post<any>(`${environment.API_URL}claims/${claimId}/attachments`, form));
  }

  getFilesToClaim(code: string) {
    return lastValueFrom(this.http.get<FileClaim[]>(`${environment.API_URL}claims/${code}/attachments`));
  }
}
