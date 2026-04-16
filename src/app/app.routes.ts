import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent), canActivate: [LoginGuard]
    }
];
