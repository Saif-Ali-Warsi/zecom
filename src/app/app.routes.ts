import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'warehouses',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then(m => m.LoginComponent)

    },
    {
        path: 'warehouses',
        loadComponent: () =>
            import('./warehouse/warehouse-list/warehouse-list.component').then(m => m.WarehouseListComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'warehouse/add',
        loadComponent: () =>
            import('./warehouse/warehouse-form/warehouse-form.component').then(m => m.WarehouseFormComponent),
        canActivate: [AuthGuard]

    },
    {
        path: 'warehouse/edit/:id',
        loadComponent: () =>
            import('./warehouse/warehouse-form/warehouse-form.component').then(m => m.WarehouseFormComponent),
        canActivate: [AuthGuard]
    }
];
