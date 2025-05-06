import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../book-service/book.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  standalone: false,
})
export class SearchBooksComponent implements OnInit {
  bookService = inject(BookService);
  searchTerm = '';
  ngOnInit() {
    this.bookService.searchBooks('');
  }
  onSearch() {
    this.bookService.searchBooks(this.searchTerm);
  }
}
