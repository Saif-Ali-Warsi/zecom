import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'warehouse',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)

    },
    {
        path: 'warehouses',
        loadComponent: () => import('./warehouse/warehouse-list/warehouse-list.component').then(m => m.WarehouseListComponent)
    },
    {
        path: 'warehouse/add',
        loadComponent: () => import('./warehouse/warehouse-form/warehouse-form.component').then(m => m.WarehouseFormComponent)

    },
    {
        path: 'warehouse/edit/:id',
        loadComponent: () => import('./warehouse/warehouse-form/warehouse-form.component').then(m => m.WarehouseFormComponent)
    }
];
