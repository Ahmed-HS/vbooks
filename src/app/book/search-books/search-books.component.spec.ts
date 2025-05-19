import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBooksComponent } from './search-books.component';
import { BookService } from '../book-service/book.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SearchBooksComponent', () => {
  let component: SearchBooksComponent;
  let fixture: ComponentFixture<SearchBooksComponent>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', [
      'getAllBooks',
      'getFilteredBooks',
      'searchBooks',
      'addBook',
      'updateBook',
      'deleteBook',
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchBooksComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchBooks method when search term is entered', () => {
    const searchTerm = 'test';
    const searchInput = fixture.debugElement.query(
      By.css('[data-test-id="search-input"]')
    );
    searchInput.nativeElement.value = searchTerm;
    searchInput.triggerEventHandler('input', {
      target: searchInput.nativeElement,
    });
    fixture.detectChanges();
    expect(bookServiceSpy.searchBooks).toHaveBeenCalledWith(searchTerm);
  });
});
