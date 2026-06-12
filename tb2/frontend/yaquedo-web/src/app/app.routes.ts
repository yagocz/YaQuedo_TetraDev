import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'trabajadores' },
      {
        path: 'trabajadores',
        loadComponent: () => import('./features/workers/workers-list/workers-list.component').then(m => m.WorkersListComponent)
      },
      {
        path: 'trabajadores/:id',
        loadComponent: () => import('./features/workers/worker-detail/worker-detail.component').then(m => m.WorkerDetailComponent)
      },
      {
        path: 'solicitudes',
        loadComponent: () => import('./features/requests/my-requests/my-requests.component').then(m => m.MyRequestsComponent)
      },
      {
        path: 'solicitudes/nueva',
        loadComponent: () => import('./features/requests/create-request/create-request.component').then(m => m.CreateRequestComponent)
      },
      {
        path: 'resenas/nueva/:solicitudId',
        loadComponent: () => import('./features/reviews/review-form/review-form.component').then(m => m.ReviewFormComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./features/perfil/mi-perfil.component').then(m => m.MiPerfilComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
