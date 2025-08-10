import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtils {

  generateRandomString(
    prefix: string,
    length: number = 10,
    type: 'alphanumeric' | 'numeric' | 'letters' = 'alphanumeric',
    letterCase: 'upper' | 'lower' | 'both' = 'both'
  ) {
    let chars = '';

    if (type === 'numeric') {
      chars = '0123456789';
    } else {
      let letters = '';
      switch (letterCase) {
        case 'upper':
          letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          break;
        case 'lower':
          letters = 'abcdefghijklmnopqrstuvwxyz';
          break;
        case 'both':
          letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          break;
      }

      if (type === 'letters') {
        chars = letters;
      } else if (type === 'alphanumeric') {
        chars = letters + '0123456789';
      }
    }

    let result = prefix;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    return result;
  }
}
