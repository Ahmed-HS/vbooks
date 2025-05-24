import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Book } from '../models/book.model';
import { inject } from '@angular/core';
import { BookService } from '../book-service/book.service';
import { firstValueFrom } from 'rxjs';

export const bookResolver: ResolveFn<Book> = async (
  route: ActivatedRouteSnapshot
) => {
  const bookid = route.paramMap.get('id');
  const bookService = inject(BookService);
  const book = await firstValueFrom(bookService.getBookById(Number(bookid)));
  return book;
};
