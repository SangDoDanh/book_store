import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { Type } from '../model/type';


const API_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})


export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + '/books');
  }

  getAllTypes(): Observable<Type[]> {
    return this.httpClient.get<Type[]>(API_URL + '/types');
  }

  addBook(book: any): Observable<Book> {
    return this.httpClient.post<Book>(API_URL + '/books', book)
  }

  deleteBook(id: any): Observable<any> {
    return this.httpClient.delete<any>(API_URL + '/books/' + id)
  }

  getBookById(id: any): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/books/' + id)
  }
}
