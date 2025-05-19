import { Component, inject } from '@angular/core';
import { BookService } from '../book-service/book.service';
import { UserService } from '../../user/user-service/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: false,
})
export class BookListComponent {
  private bookService = inject(BookService);
  userService = inject(UserService);
  books = toSignal(this.bookService.getFilteredBooks());
  onLogout() {
    this.userService.logout();
  }
}
