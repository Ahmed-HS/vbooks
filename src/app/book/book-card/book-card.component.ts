import { Component, input } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  standalone: false,
})
export class BookCardComponent {
  book = input.required<Book>();
}
