import { TestBed } from '@angular/core/testing';
import { BookService } from '../book-service/book.service';
import { bookResolver } from './book.resolver';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Book } from '../models/book.model';

describe('BookResolver', () => {
  const routeSnapshotSpy = {
    paramMap: new Map<string, string>([['id', '1']]),
  } as unknown as ActivatedRouteSnapshot;

  const bookServiceSpy: jasmine.SpyObj<BookService> = jasmine.createSpyObj(
    'BookService',
    ['getBookById']
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
      ],
    });
  });

  it('book resolver should call getBookById method', async () => {
    bookServiceSpy.getBookById.and.returnValue(
      of({
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
      })
    );
    await TestBed.runInInjectionContext(async () => {
      const book = (await bookResolver(
        routeSnapshotSpy,
        {} as RouterStateSnapshot
      )) as Book;
      expect(bookServiceSpy.getBookById).toHaveBeenCalledWith(1);
      expect(book.title).toEqual('New Book');
    });
  });
});
