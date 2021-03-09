import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookforsaleService } from "src/app/bookforsale.service";
import { CategoryService } from "src/app/category.service";
import { Cat } from "src/app/category/cat";
import { Bfs } from "../bfs";
@Component({
  selector: 'app-editbookforsale',
  templateUrl: './editbookforsale.component.html',
  styleUrls: ['./editbookforsale.component.css']
})
export class EditbookforsaleComponent implements OnInit {
  book_id=1;
  cat:Cat[]=[];
  applicant: any;
  bfsform:FormGroup;
  selectedfile:File=null;
  constructor(private _bfsdata:BookforsaleService,private _catdata:CategoryService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._catdata.getAllCategory().subscribe(
      (data:Cat[])=>{
        this.cat=data;
      }
    );

    this.bfsform=new FormGroup({
      book_id:new FormControl(null),
      book_isbn:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_title : new FormControl(null,Validators.required),
      book_author:new FormControl(null,Validators.required),
      book_price:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_publisher:new FormControl(null,Validators.required),
      book_ratings:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_image:new FormControl(null,Validators.required),
      fk_category_id:new FormControl(null),
    });

    this.book_id=this._actRoute.snapshot.params['book_id'];
    console.log(this.book_id);
    this._bfsdata.getBookforsaleById(this.book_id).subscribe((data:Bfs[])=>{
      console.log(data);
      this.bfsform.patchValue({
        book_id:data[0].book_id,
        book_isbn:data[0].book_isbn,
        book_title:data[0].book_title,
        book_author:data[0].book_author,
        book_price:data[0].book_price,
        book_publisher:data[0].book_publisher,
        book_ratings:data[0].book_ratings,
        book_image:data[0].book_image,
        fk_category_id:data[0].fk_category_id,
      });
    });
  }
  onEditCategory(){

    const fd=new FormData();
    fd.append('book_isbn',this.bfsform.get('book_isbn').value);
    fd.append('book_title',this.bfsform.get('book_title').value);
    fd.append('book_author',this.bfsform.get('book_author').value);
    fd.append('book_price',this.bfsform.get('book_price').value);
    fd.append('book_publisher',this.bfsform.get('book_publisher').value);
    fd.append('book_ratings',this.bfsform.get('book_ratings').value);
    fd.append('book_image',this.selectedfile,this.selectedfile.name);
    fd.append('fk_category_id',this.bfsform.get('fk_category_id').value);
    console.log(fd);

    this._bfsdata.editBookforsale(fd).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data updated succesfully');
        this._router.navigate(['/home/bookforsale']);

       }
       else{
         alert('Something went wrong');
         console.log(data);
       }
     },
     function(err){
       console.log(err);

    });
  }
  onCancleClick(){
    this._router.navigate(['/home/bookforsale']);
  }

  onEditFile(value){
    this.selectedfile=<File>value.target.files[0];
  }

}
