import { HttpClient, HttpParams } from '@angular/common/http';
import { BookService } from './book.service';
import { UserService } from '../../user/user-service/user.service';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, lastValueFrom, of } from 'rxjs';
import { mapToDTO } from '../models/book.model';

describe('BookService', () => {
  let bookService: BookService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  const mockBooks = [
    { title: 'Book 1', author: 'Author 1', description: 'Description 1' },
    { title: 'Book 2', author: 'Author 2', description: 'Description 2' },
  ];
  const sampleBook = {
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
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'patch',
      'delete',
    ]);
    userServiceSpy = jasmine.createSpyObj('UserService', [], {
      // Mock property with getter
      get currentUser() {
        return {
          id: 1,
          email: 'Ahmed@gmail.com',
          accessToken: 'accessToken',
          expiresAt: 1746537870734,
        };
      },
    });
    TestBed.configureTestingModule({
      providers: [
        BookService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    });

    bookService = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy();
  });

  it('getAllBooks should call httpClient.get with correct books URL and user id', () => {
    // Mock the response of the getAllBooks method
    httpClientSpy.get.and.returnValue(of([]));
    const booksUrl =
      'https://katuhqknilkfzuhicoxj.supabase.co/rest/v1/books?select=*';
    const expectedParams = {
      params: new HttpParams().set('user_id', `eq.1`),
    };
    bookService.getAllBooks();

    expect(httpClientSpy.get).toHaveBeenCalledWith(booksUrl, expectedParams);
  });

  it('getFilteredBooks should call getAllBooks and filter books based on title in the search term', async () => {
    httpClientSpy.get.and.returnValue(of(mockBooks));
    const filteredBooksPromise = firstValueFrom(bookService.getFilteredBooks());
    const searchTerm = 'Book 1';
    bookService.searchBooks(searchTerm);
    const filteredBooks = await filteredBooksPromise;
    expect(filteredBooks.length).toBe(1);
    expect(filteredBooks[0].title).toBe('Book 1');
  });

  it('getFilteredBooks should call getAllBooks and filter books based on author in the search term', async () => {
    httpClientSpy.get.and.returnValue(of(mockBooks));
    const filteredBooksPromise = firstValueFrom(bookService.getFilteredBooks());
    const searchTerm = 'Author 2';
    bookService.searchBooks(searchTerm);
    const filteredBooks = await filteredBooksPromise;
    expect(filteredBooks.length).toBe(1);
    expect(filteredBooks[0].author).toBe('Author 2');
  });

  it('getFilteredBooks should return all books if search term is empty', async () => {
    httpClientSpy.get.and.returnValue(of(mockBooks));
    const filteredBooksPromise = firstValueFrom(bookService.getFilteredBooks());
    const searchTerm = '';
    bookService.searchBooks(searchTerm);
    const filteredBooks = await filteredBooksPromise;
    expect(filteredBooks.length).toBe(2);
    expect(filteredBooks[0].title).toBe('Book 1');
    expect(filteredBooks[1].title).toBe('Book 2');
  });

  it('getBookById should call httpClient.get with correct URL and params', () => {
    httpClientSpy.get.and.returnValue(of({}));
    const bookId = 1;
    const expectedParams = {
      params: new HttpParams()
        .set(
          'select',
          'id,title,description,author,publication_date,published_by,rating,page_count,category,img_url'
        )
        .set('id', `eq.1`),
    };
    const booksUrl = 'https://katuhqknilkfzuhicoxj.supabase.co/rest/v1/books';
    bookService.getBookById(bookId);
    expect(httpClientSpy.get).toHaveBeenCalledWith(booksUrl, expectedParams);
  });
  it('getBookById should return the first book from the response', async () => {
    const mockResponse = [
      {
        id: 1,
        title: 'Book 1',
        description: 'Description 1',
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockResponse));
    const bookId = 1;
    const book = await firstValueFrom(bookService.getBookById(bookId));
    expect(book).toEqual(mockResponse[0]);
  });
  it('addBook should call httpClient.post with correct URL and new book data', () => {
    httpClientSpy.post.and.returnValue(of({}));
    const newBook = {
      userId: 1,
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
    bookService.addBook(newBook);
    const booksUrl = 'https://katuhqknilkfzuhicoxj.supabase.co/rest/v1/books';
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      booksUrl,
      mapToDTO(newBook)
    );
  });

  it('deleteBook should call httpClient.delete with correct URL and params', () => {
    const expectedParams = {
      params: new HttpParams().set('id', `eq.1`).set('user_id', `eq.1`),
    };
    const booksUrl = 'https://katuhqknilkfzuhicoxj.supabase.co/rest/v1/books';
    httpClientSpy.delete.and.returnValue(of({}));
    bookService.deleteBook(sampleBook);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(booksUrl, expectedParams);
  });
  it('updateBook should call httpClient.patch with correct URL and params', () => {
    const expectedParams = {
      params: new HttpParams().set('id', `eq.1`).set('user_id', `eq.1`),
    };
    const booksUrl = 'https://katuhqknilkfzuhicoxj.supabase.co/rest/v1/books';
    httpClientSpy.patch.and.returnValue(of({}));
    bookService.updateBook(sampleBook);
    expect(httpClientSpy.patch).toHaveBeenCalledWith(
      booksUrl,
      mapToDTO(sampleBook),
      expectedParams
    );
  });
});
