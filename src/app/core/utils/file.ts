import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUtils {
  bytesToMb(bytes: number) {
    return (bytes / 1024 / 1024).toFixed(2);
  }
}
