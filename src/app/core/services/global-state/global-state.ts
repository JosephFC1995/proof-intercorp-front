import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalState {
  menuHidden = signal<Boolean>(false);

  changeMenuHidden(value: Boolean) {
    this.menuHidden.set(value);
  }
}
