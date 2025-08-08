import { Routes } from '@angular/router';
import { Default } from './core/layouts/default/default';

export const routes: Routes = [
    {
        path: 'app',
        component: Default,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/modules-module').then(m => m.ModulesModule),
            }],
    },
    { path: '', pathMatch: 'full', redirectTo: 'app' },
    { path: '**', redirectTo: 'app' },
];
