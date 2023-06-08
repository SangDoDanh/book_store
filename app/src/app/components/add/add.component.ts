import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { Type } from 'src/app/model/type';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{

  types: Type[] = [];
  rfAdd!: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.rfAdd = this.fb.group({
      
        title: [''],
        quantity: [''],
        price: [''],
        description: [''],
        image: [''],
        type: ['1'] 
      });

  }



  ngOnInit(): void {
    this.bookService.getAllTypes().subscribe(data => {
      this.types = data;
    });
  }

  onSubmit() {

    let typeAdd:Type = {};
    let book: Book;


    this.types.forEach(t => {
      console.log()
      if(t.id == this.rfAdd.value['type']) {

        typeAdd = t;
      }
    })

    book = this.rfAdd.value;
    book.type = typeAdd;
    book.image = 'https://picsum.photos/500/500?random';
    this.bookService.addBook(book).subscribe(data => {
      console.log(data);
    })
  }

  compareFn(c1: any, c2: any): boolean {
    console.log(c1 && c2 ? c1.id === c2.id : c1 === c2);
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
