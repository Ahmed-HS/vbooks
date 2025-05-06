import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookRoutingModule } from './book-routing.module';
import { BookCardComponent } from './book-card/book-card.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
@NgModule({
  declarations: [
    BookCardComponent,
    BookListComponent,
    BookDetailsComponent,
    SearchBooksComponent,
    AddEditBookComponent,
  ],
  imports: [CommonModule, BookRoutingModule, FormsModule, ReactiveFormsModule],
})
export class BookModule {}
