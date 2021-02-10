import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BookreviewService } from "src/app/bookreview.service";

@Component({
  selector: 'app-editbookreview',
  templateUrl: './editbookreview.component.html',
  styleUrls: ['./editbookreview.component.css']
})
export class EditbookreviewComponent implements OnInit {

  bookreviewadd:FormGroup;
  flag: boolean = false;
  bookreview_id;
  constructor(private _editbookrev:BookreviewService,private _actRoute:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this.bookreviewadd=new FormGroup({
      bookreview_id:new FormControl(null),
      bookreview_description:new FormControl(null),
      bookreview_date:new FormControl(null),
      fk_bookbarter_id:new FormControl(null),
      fk_customer_id:new FormControl(null),
      fk_category_id:new FormControl(null),
    });

    this.bookreview_id=this._actRoute.snapshot.params['bookreview_id'];
    console.log(this.bookreview_id);
    this._editbookrev.getBookreviewById(this.bookreview_id).subscribe((data:any)=>{
      console.log(data);
      this.bookreviewadd.patchValue({
        bookreview_id:data[0].bookreview_id,
        bookreview_description:data[0].bookreview_description,
        bookreview_date:data[0].bookreview_date,
      });
    });
  }


  onEditClick()
  {
    this._editbookrev.editBookreview(this.bookreviewadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row updated successfully');
       this._router.navigate(['/bookreview']);
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
