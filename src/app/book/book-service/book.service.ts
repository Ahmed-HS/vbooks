import { inject, Injectable } from '@angular/core';
import { Book, mapFromDTO, mapToDTO, NewBook } from '../models/book.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { booksListUrl, booksUrl } from '../../core/supabase.config';
import { combineLatestWith, debounceTime, map, Subject } from 'rxjs';
import { UserService } from '../../user/user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private searchTerm = new Subject<string>();

  getAllBooks() {
    return this.http
      .get<Book[]>(booksListUrl, {
        params: new HttpParams().set(
          'user_id',
          `eq.${this.userService.currentUser!.id}`
        ),
      })
      .pipe(map((books) => books.map((book) => mapFromDTO(book) as Book)));
  }

  getFilteredBooks() {
    return this.getAllBooks().pipe(
      combineLatestWith(this.searchTerm.pipe(debounceTime(200))),
      map(([books, term]) => {
        if (!term) return books;
        const lowerTerm = term.toLowerCase();
        return books.filter(
          (book) =>
            book.title.toLowerCase().includes(lowerTerm) ||
            book.author.toLowerCase().includes(lowerTerm) ||
            book.description.toLowerCase().includes(lowerTerm)
        );
      })
    );
  }

  searchBooks(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }

  getBookById(id: number) {
    const params = new HttpParams()
      .set(
        'select',
        'id,title,description,author,publication_date,published_by,rating,page_count,category,img_url'
      )
      .set('id', `eq.${id}`);

    return this.http
      .get<Book[]>(booksUrl, { params })
      .pipe(map((books) => mapFromDTO(books[0])));
  }

  addBook(newbook: NewBook) {
    const userId = this.userService.currentUser!.id;
    this.http.post(booksUrl, mapToDTO({ userId, ...newbook })).subscribe();
  }

  deleteBook(book: Book) {
    const userId = this.userService.currentUser!.id;
    const params = new HttpParams()
      .set('id', `eq.${book.id}`)
      .set('user_id', `eq.${userId}`);
    this.http.delete(booksUrl, { params }).subscribe();
  }

  updateBook(book: Book) {
    const userId = this.userService.currentUser!.id;
    const params = new HttpParams()
      .set('id', `eq.${book.id}`)
      .set('user_id', `eq.${userId}`);
    return this.http.patch(booksUrl, mapToDTO(book), { params });
  }
}
