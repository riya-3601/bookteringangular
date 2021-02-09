import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { BookforbarterService } from "../bookforbarter.service";
import { Bookbart } from "./bookbart";

@Component({
  selector: 'app-bookforbarter',
  templateUrl: './bookforbarter.component.html',
  styleUrls: ['./bookforbarter.component.css']
})
export class BookforbarterComponent implements OnInit {

  obj:Bookbart[]=[];
  bookforbarteradd:FormGroup;
  flag: boolean = false;
  constructor(private _bookbartdata:BookforbarterService,private _router:Router) { }

  ngOnInit(): void {
    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null),
      bookbarter_title:new FormControl(null),
      bookbarter_author:new FormControl(null),
      bookbarter_status:new FormControl(null),
      bookbarter_price:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });



    this._bookbartdata.getAllBookforbarter().subscribe((data:Bookbart[])=>{
      this.obj=data;
    });
  }

  onDeleteClick(item: Bookbart) {
    this._bookbartdata.deleteBookforbarter(item.bookbarter_id).subscribe((data:any)=>{
      if(confirm('Are you sure you want to delete?'))
      {
      if(data.affectedRows==1)
      {
        this.obj.splice(this.obj.indexOf(item),1);
        alert('Deleted successfully');
      }
      else
      {
        console.log(data);
        alert('Something went wrong');
      }
    }
    })

}

onEditClick(item:Bookbart){
 this._router.navigate(['/editbookforbarter',item.bookbarter_id]);
}

}
