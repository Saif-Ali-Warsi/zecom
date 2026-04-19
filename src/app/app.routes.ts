import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'tasks',
        loadComponent: () => import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent)
    },
    {
        path: 'task/add',
        loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
    },
    {
        path: 'task/edit/:id',
        loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
    }
];
