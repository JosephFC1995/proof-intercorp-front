import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../../types/global';
import { GlobalState } from '../../../services/global-state/global-state';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styles: ``,
  standalone: true,
})
export class Sidebar {
  globalState = inject(GlobalState);

  isHiddenMenu = computed(() => this.globalState.menuHidden());

  toggleMenu() {
    this.globalState.changeMenuHidden(!this.globalState.menuHidden());
  }


  menu = signal<MenuItem[]>([
    {
      label: 'Reclamos',
      routerLink: undefined,
      submenu: [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-list',
          routerLink: '/app/',
        },
        {
          label: 'Resumen',
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: '/app/summary',
        }
      ],
    },

  ]);
}
