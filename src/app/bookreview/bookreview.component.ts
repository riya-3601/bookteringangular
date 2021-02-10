import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { BookreviewService } from "../bookreview.service";
import { Bookrev } from "./bookrev";

@Component({
  selector: 'app-bookreview',
  templateUrl: './bookreview.component.html',
  styleUrls: ['./bookreview.component.css']
})
export class BookreviewComponent implements OnInit {

  obj:Bookrev[]=[];
  bookreviewadd:FormGroup;
  flag: boolean = false;
  constructor(private _bookrevdata:BookreviewService,private _router:Router) { }

  ngOnInit(): void {

    this.bookreviewadd=new FormGroup({
      bookreview_id:new FormControl(null),
      bookreview_description:new FormControl(null),
      bookreview_date:new FormControl(null),
      fk_bookbarter_id:new FormControl(null),
      fk_customer_id:new FormControl(null),
      fk_category_id:new FormControl(null),
    });



    this._bookrevdata.getAllBookreview().subscribe((data:Bookrev[])=>{
      this.obj=data;
    });
  }


  onDeleteClick(item: Bookrev) {
    this._bookrevdata.deleteBookreview(item.bookreview_id).subscribe((data:any)=>{
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

onEditClick(item:Bookrev){
 this._router.navigate(['/editbookreview',item.bookreview_id]);
}
}
