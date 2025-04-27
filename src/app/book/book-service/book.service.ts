import { computed, Injectable, signal } from '@angular/core';
import { Book, NewBook, sampleBooks } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books = signal<Book[]>(sampleBooks);

  searchTerm = signal<string>('');
  filteredBooks = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    if (searchTerm.trim() === '') return this.books();
    return this.books().filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
  });

  getBookById(id: number) {
    return this.books().find((book) => book.id === id);
  }

  addBook(newbook: NewBook) {
    const id = this.books().length + 1;
    const book = { id, ...newbook };
    this.books.update((books) => [...books, book]);
  }

  deleteBook(book: Book) {
    this.books.update((books) => books.filter((b) => b.id !== book.id));
  }
}
