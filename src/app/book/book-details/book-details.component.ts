import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  standalone: false,
})
export class BookDetailsComponent {
  private bookId: number;
  private averageReadingSpeed: number = 30; // pages per hour
  book: Book | undefined;
  constructor(
    currentRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.bookId = Number(currentRoute.snapshot.paramMap.get('id'));
    this.book = bookService.getBookById(this.bookId);
  }

  getReadingTimeHours(book: Book): number {
    return Math.floor(book.pageCount / this.averageReadingSpeed);
  }

  getReadingTimeMinutes(book: Book): number {
    return Math.round(
      (book.pageCount % this.averageReadingSpeed) /
        (this.averageReadingSpeed / 60)
    );
  }

  onDeleteBook() {
    if (!this.book) return;
    this.bookService.deleteBook(this.book);
    this.router.navigate(['/books']);
  }
}
