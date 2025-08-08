import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeState {
  isDarkMode = signal<boolean>(
    document.documentElement.classList.contains('int-corp-dark')
  );

  constructor() {
    const observer = new MutationObserver(() => {
      this.isDarkMode.set(
        document.documentElement.classList.contains('int-corp-dark')
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}
