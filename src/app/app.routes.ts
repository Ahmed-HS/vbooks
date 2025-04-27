import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
];
