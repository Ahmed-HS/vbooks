import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { bookResolver } from './resolvers/book.resolver';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    pathMatch: 'full',
  },
  {
    path: 'new',
    component: AddEditBookComponent,
  },
  {
    path: ':id',
    component: BookDetailsComponent,
    resolve: { book: bookResolver },
  },
  {
    path: ':id/edit',
    component: AddEditBookComponent,
    resolve: { book: bookResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
