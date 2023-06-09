import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { Customer } from 'src/app/model/customer';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  books: Book[] = [];

  customers: any = [];
  customerIDCureent!: number;

  bookView!: Book;

  namDelete = '';
  idDelete = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private cartService: CartService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;

      console.log(data);
    });

    this.customerService.getAllCustomer().subscribe((data) => {
      this.customers = data;
      console.log('c', data[0].customerId);
      this.customerIDCureent = this.customers[0].customerId;
      console.log(this.customerIDCureent);
    });
  }

  changeCustomer(e: any) {
    this.customerIDCureent = e.target.value;
    console.log(this.customerIDCureent);
  }

  payBook(book: Book) {
    if (this.customerIDCureent)
      this.cartService
        .payBook(book, this.customerIDCureent)
        .subscribe((data) => {
          console.log('pay ok', data);
        });
  }

  onDelete(name: any, id: any) {
    this.namDelete = name;
    this.idDelete = id;
  }

  deleteBook() {
    this.bookService.deleteBook(this.idDelete).subscribe((data) => {
      console.log('xoá thành công', data);
      this.router.navigateByUrl('/list');
    });
  }

  onBtnPay(book: Book) {
    this.cartService.payBook(book, this.customerIDCureent).subscribe((book) => {
      const indexBook = this.books.findIndex((b) => b.id == book.id);
      if (book.quantity <= 0) {
        this.books.splice(indexBook, 1);
      } else if (this.books[indexBook].quantity) {
        this.books[indexBook].quantity = book.quantity;
      }
    });
  }

  viewBook(book: Book) {
    if (book) this.bookView = book;
  }
}
