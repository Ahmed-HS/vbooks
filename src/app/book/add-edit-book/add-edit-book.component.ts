import { Component, inject, input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-edit-book.component.html',
  standalone: false,
})
export class AddEditBookComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);
  private currentRoute = inject(ActivatedRoute);
  book = input<Book>();

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    publicationDate: ['', Validators.required],
    publishedBy: ['', Validators.required],
    rating: ['', Validators.required],
    pageCount: ['', Validators.required],
    imgUrl: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    const currentBook = this.book();
    if (currentBook) {
      this.bookForm.setValue({
        title: currentBook.title,
        author: currentBook.author,
        category: currentBook.category,
        publicationDate: currentBook.publicationDate.toString(),
        publishedBy: currentBook.publishedBy,
        rating: currentBook.rating.toString(),
        pageCount: currentBook.pageCount.toString(),
        imgUrl: currentBook.imgUrl,
        description: currentBook.description,
      });
    }
  }

  async addBook() {
    const fromValue = this.bookForm.getRawValue();
    const newBook = {
      title: fromValue.title,
      description: fromValue.description,
      author: fromValue.author,
      category: fromValue.category,
      publicationDate: new Date(fromValue.publicationDate),
      publishedBy: fromValue.publishedBy,
      rating: +fromValue.rating,
      pageCount: +fromValue.pageCount,
      imgUrl: fromValue.imgUrl,
    };
    const currentBook = this.book();
    if (currentBook) {
      await firstValueFrom(
        this.bookService.updateBook({ id: currentBook.id, ...newBook })
      );
      this.router.navigate(['../'], {
        relativeTo: this.currentRoute,
      });
    } else {
      this.bookService.addBook(newBook);
      this.router.navigate(['/books']);
    }
  }
}
