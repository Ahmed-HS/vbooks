import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditBookComponent } from './add-edit-book.component';
import { BookService } from '../book-service/book.service';
import {
  ActivatedRoute,
  provideRouter,
  Router,
  RouterLink,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AddEditBookComponent', () => {
  let component: AddEditBookComponent;
  let fixture: ComponentFixture<AddEditBookComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', [
      'getAllBooks',
      'addBook',
      'updateBook',
      'deleteBook',
    ]);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterLink],
      declarations: [AddEditBookComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
        provideRouter([]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddEditBookComponent);
    spyOn(TestBed.inject(Router), 'navigate');
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addBook method when form is submitted if input book is undefined', () => {
    component.addBook();
    expect(bookServiceSpy.addBook).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/books']);
  });

  it('should call updateBook method when form is submitted if input book is defined', async () => {
    const book = {
      id: 1,
      title: 'New Book',
      description: 'New Book Description',
      author: 'New Author',
      publicationDate: new Date(),
      publishedBy: 'New Publisher',
      rating: 4.5,
      pageCount: 250,
      category: 'Fiction',
      imgUrl: 'http://example.com/image.jpg',
    };
    fixture.componentRef.setInput('book', book);
    bookServiceSpy.updateBook.and.returnValue(of({}));
    await component.addBook();
    expect(bookServiceSpy.updateBook).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['../'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it('should show error message if form is invalid', () => {
    component.bookForm.setValue({
      title: '',
      author: '',
      category: '',
      publicationDate: '',
      publishedBy: '',
      rating: '',
      pageCount: '',
      imgUrl: '',
      description: '',
    });
    fixture.detectChanges();
    const errorParagraph = fixture.debugElement.query(
      By.css('[data-test-id="errorMessage"]')
    );
    const errorMessage = errorParagraph.nativeElement as HTMLParagraphElement;
    expect(errorMessage.classList).not.toContain('invisible');
  });

  it('should hide error message if form is valid', () => {
    component.bookForm.setValue({
      title: 'Book Title',
      author: 'Author Name',
      category: 'Fiction',
      publicationDate: '01-01-2023',
      publishedBy: 'Ahmed',
      rating: '3',
      pageCount: '250',
      imgUrl: 'test.jpg',
      description: 'Book Description',
    });
    fixture.detectChanges();
    const errorParagraph = fixture.debugElement.query(
      By.css('[data-test-id="errorMessage"]')
    );
    const errorMessage = errorParagraph.nativeElement as HTMLParagraphElement;
    expect(errorMessage.classList).toContain('invisible');
  });
});
