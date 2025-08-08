import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'claims',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./claims/claims-detail/claims-detail').then(m => m.ClaimsDetail),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app',
      }
    ],

  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./summary/summary/summary').then(m => m.Summary),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
