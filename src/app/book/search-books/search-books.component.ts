import { Component, inject } from '@angular/core';
import { BookService } from '../book-service/book.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  standalone: false,
})
export class SearchBooksComponent {
  bookService = inject(BookService);
}
