import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { Type } from 'src/app/model/type';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  types: Type[] = [];
  rfEdit!: FormGroup;
  bookEdit!: Book;

  idEdit!: any;

  constructor(private bookService: BookService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.rfEdit = this.fb.group({
        id:[''],
        title: [''],
        quantity: [''],
        price: [''],
        description: [''],
        image: [''],
        type: ['1'] 
      });
      

  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEdit = params['id'];
      console.log(this.idEdit);
      this.bookService.getBookById(this.idEdit).subscribe(data => {
        this.bookEdit = data;
        this.bookEdit.id = this.idEdit;
        this.rfEdit.setValue(this.bookEdit);
      })
    });


    this.bookService.getAllTypes().subscribe(data => {
      this.types = data;
    });
  }

  onSubmit() {

    let typeAdd:Type = {};
    let book: Book;


    this.types.forEach(t => {
      console.log()
      if(t.id == this.rfEdit.value['type']) {

        typeAdd = t;
      }
    })

    book = this.rfEdit.value;
    book.type = typeAdd;
    book.image = 'https://picsum.photos/500/500?random';
    this.bookService.addBook(book).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/list');
    })
  }

  compareFn(c1: any, c2: any): boolean {
    console.log(c1 && c2 ? c1.id === c2.id : c1 === c2);
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
