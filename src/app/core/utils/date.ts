import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtils {
  private datePipe = inject(DatePipe);

  format(date: Date | null, format: string) {
    return this.datePipe.transform(date || new Date(), format) as string;
  }
}
