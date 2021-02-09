import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BookforbarterService } from "src/app/bookforbarter.service";

@Component({
  selector: 'app-editbookforbarter',
  templateUrl: './editbookforbarter.component.html',
  styleUrls: ['./editbookforbarter.component.css']
})
export class EditbookforbarterComponent implements OnInit {

  constructor(private _editbookbart:BookforbarterService,private _actRoute:ActivatedRoute,private _router:Router) { }

  bookforbarteradd:FormGroup;
  flag: boolean = false;
  bookbarter_id;
  ngOnInit(): void {
    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null),
      bookbarter_title:new FormControl(null),
      bookbarter_author:new FormControl(null),
      bookbarter_status:new FormControl(null),
      bookbarter_price:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });


    this.bookbarter_id=this._actRoute.snapshot.params['bookbarter_id'];
    console.log(this.bookbarter_id);
    this._editbookbart.getBookforbarterById(this.bookbarter_id).subscribe((data:any)=>{
      console.log(data);
      this.bookforbarteradd.patchValue({
        bookbarter_id:data[0].bookbarter_id,
        bookbarter_title:data[0].bookbarter_title,
        bookbarter_author:data[0].bookbarter_author,
        bookbarter_status:data[0].bookbarter_status,
        bookbarter_price:data[0].bookbarter_price,
      });
    });
  }

  onEditClick()
  {
    this._editbookbart.editBookforbarter(this.bookforbarteradd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row updated successfully');
       this._router.navigate(['/bookforbarter']);
      }
      else
      {
        alert('Something went wrong');
      }
    },function(err){
      console.log(err);
    });
  }
  onCancelClick(): void {
    this.flag = false;
  }
}
