import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { BookforbarterService } from "src/app/bookforbarter.service";
import { Bookbart } from "../bookbart";

@Component({
  selector: 'app-addbookforbarter',
  templateUrl: './addbookforbarter.component.html',
  styleUrls: ['./addbookforbarter.component.css']
})
export class AddbookforbarterComponent implements OnInit {

  constructor(private _bookbartdata:BookforbarterService) { }

  bookforbarteradd:FormGroup;
  flag: boolean = false;
  obj:Bookbart[]=[];
  ngOnInit(): void {

    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null),
      bookbarter_title:new FormControl(null),
      bookbarter_author:new FormControl(null),
      bookbarter_status:new FormControl(null),
      bookbarter_price:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
  }


  onsubmitClick()
  {
    this._bookbartdata.addBookforbarter(this.bookforbarteradd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
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
