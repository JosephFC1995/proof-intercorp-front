import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SummaryResponse } from '../../types/summary';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private http: HttpClient = inject(HttpClient);

  getSummary() {
    return lastValueFrom(this.http.get<SummaryResponse>(`${environment.API_URL}summary`));
  }
}
