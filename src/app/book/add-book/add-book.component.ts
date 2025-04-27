import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book-service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  standalone: false,
})
export class AddBookComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);
  addBookForm = this.formBuilder.group({
    title: this.formBuilder.control(''),
    author: this.formBuilder.control(''),
    category: this.formBuilder.control(''),
    publicationDate: this.formBuilder.control(''),
    publishedBy: this.formBuilder.control(''),
    rating: this.formBuilder.control(''),
    pageCount: this.formBuilder.control(''),
    imgUrl: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
  });

  addBook() {
    const fromValue = this.addBookForm.getRawValue();
    const newBook = {
      title: fromValue.title,
      description: fromValue.description,
      author: fromValue.author,
      categories: [fromValue.category],
      publicationDate: new Date(fromValue.publicationDate),
      publishedBy: fromValue.publishedBy,
      rating: +fromValue.rating,
      pageCount: +fromValue.pageCount,
      imgUrl: fromValue.imgUrl,
    };
    this.bookService.addBook(newBook);
    this.router.navigate(['/books']);
  }
}
