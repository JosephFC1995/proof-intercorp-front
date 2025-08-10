import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from '../../types/global';
import { Sidebar } from '../../components/general/sidebar/sidebar';
import { Topbar } from '../../components/general/topbar/topbar';
import { GlobalState } from '../../services/global-state/global-state';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet, Sidebar, Topbar, ToastModule],
  templateUrl: './default.html',
  styles: ``
})
export class Default {
  globalState = inject(GlobalState);
  isHiddenMenu = computed(() => this.globalState.menuHidden());
}
