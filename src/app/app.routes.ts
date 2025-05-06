import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './user/route-guards/auth.guard';

export const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
