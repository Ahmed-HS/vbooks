import { Component, inject } from '@angular/core';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: false,
})
export class BookListComponent {
  private bookService: BookService = inject(BookService);
  books = this.bookService.filteredBooks;
}
