import { Book, mapFromDTO, mapToDTO } from './book.model';

describe('Book DTO mapping', () => {
  it('should map snake_case to camelCase', () => {
    const bookDTO = {
      id: 1,
      title: 'Book Title',
      description: 'Book Description',
      author: 'Author Name',
      publication_date: '2023-01-01',
      published_by: 'Publisher Name',
      rating: 4.5,
      page_count: 300,
      category: 'Fiction',
      img_url: 'http://example.com/image.jpg',
    };
    const mappedBook = mapFromDTO(bookDTO) as Book;
    expect(mappedBook.publishedBy).toBeTruthy();
    expect(mappedBook.publishedBy).toEqual(bookDTO.published_by);

    expect(mappedBook.pageCount).toBeTruthy();
    expect(mappedBook.pageCount).toEqual(bookDTO.page_count);
  });

  it('should map camelCase to snake_case', () => {
    const book = {
      id: 1,
      title: 'Book Title',
      description: 'Book Description',
      author: 'Author Name',
      publicationDate: '2023-01-01',
      publishedBy: 'Publisher Name',
      rating: 4.5,
      pageCount: 300,
      category: 'Fiction',
      imgUrl: 'http://example.com/image.jpg',
    };
    const mappedBookDTO = mapToDTO(book) as any;
    expect(mappedBookDTO.published_by).toBeTruthy();
    expect(mappedBookDTO.published_by).toEqual(book.publishedBy);

    expect(mappedBookDTO.page_count).toBeTruthy();
    expect(mappedBookDTO.page_count).toEqual(book.pageCount);
  });

  it('mapToDTO should return the input if it is not an object', () => {
    const input = 'not an object';
    const result = mapToDTO(input);
    expect(result).toEqual(input);
  });

  it('mapFromDTO should return the input if it is not an object', () => {
    const input = 'not an object';
    const result = mapFromDTO(input);
    expect(result).toEqual(input);
  });
});
