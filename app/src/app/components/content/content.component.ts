import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{
 
  books: Book[] = [];

  namDelete = '';
  idDelete = '';

  constructor(private bookService: BookService, private router: Router) {

  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.books = data;

      console.log(data);
    })
  }

  onDelete(name: any, id: any) {
    this.namDelete = name;
    this.idDelete = id;
  }

  deleteBook() {
    this.bookService.deleteBook(this.idDelete).subscribe(data => {
      console.log('xoá thành công', data);
      this.router.navigateByUrl('/list');
    });
  }

}
