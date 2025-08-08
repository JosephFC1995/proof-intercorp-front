import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GlobalState } from '../../../services/global-state/global-state';

@Component({
  selector: 'app-topbar',
  imports: [ButtonModule],
  providers: [],
  templateUrl: './topbar.html',
  styles: ``
})
export class Topbar {
  globalState = inject(GlobalState);
  isHiddenMenu = computed(() => this.globalState.menuHidden());

  toggleMenu() {
    this.globalState.changeMenuHidden(!this.globalState.menuHidden());
  }

  toggleDarkMode() {
    const element = document.querySelector('html') as any;
    element.classList.toggle('int-corp-dark');
  }
}
