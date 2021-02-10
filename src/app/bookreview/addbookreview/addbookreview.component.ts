import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Bookrev } from "../bookrev";
import { BookreviewService } from "src/app/bookreview.service";


@Component({
  selector: 'app-addbookreview',
  templateUrl: './addbookreview.component.html',
  styleUrls: ['./addbookreview.component.css']
})
export class AddbookreviewComponent implements OnInit {

  constructor(private _bookrevdata:BookreviewService) { }


  obj:Bookrev[]=[];
  bookreviewadd:FormGroup;
  flag: boolean = false;
  ngOnInit(): void {


    this.bookreviewadd=new FormGroup({
      bookreview_id:new FormControl(null),
      bookreview_description:new FormControl(null),
      bookreview_date:new FormControl(null),
      fk_bookbarter_id:new FormControl(null),
      fk_customer_id:new FormControl(null),
      fk_category_id:new FormControl(null),
    });
  }

  onsubmitClick()
  {
    this._bookrevdata.addBookreview(this.bookreviewadd.value).subscribe((data:any)=>{
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
