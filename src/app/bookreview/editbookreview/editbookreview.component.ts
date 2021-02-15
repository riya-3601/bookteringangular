import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BookforbarterService } from 'src/app/bookforbarter.service';
import { Bookbart } from 'src/app/bookforbarter/bookbart';
import { BookreviewService } from "src/app/bookreview.service";
import { CategoryService } from 'src/app/category.service';
import { Cat } from 'src/app/category/cat';
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';

@Component({
  selector: 'app-editbookreview',
  templateUrl: './editbookreview.component.html',
  styleUrls: ['./editbookreview.component.css']
})
export class EditbookreviewComponent implements OnInit {

  cust:Cust[]=[];
  cat:Cat[]=[];
  book:Bookbart[]=[];
  bookreviewadd:FormGroup;
  flag: boolean = false;
  bookreview_id;
  constructor(private _editbookrev:BookreviewService,private _actRoute:ActivatedRoute,private _router:Router,private _catdata:CategoryService,private _custdata:CustomerService,private _bookbartdata:BookforbarterService) { }

  ngOnInit(): void {
    this.bookreviewadd=new FormGroup({
      bookreview_id:new FormControl(null,[Validators.required,Validators.maxLength(200)]),
      bookreview_description:new FormControl(null,[Validators.required]),
      bookreview_date:new FormControl(null,[Validators.required]),
      fk_bookbarter_id:new FormControl(null,[Validators.required]),
      fk_customer_id:new FormControl(null,[Validators.required]),
      fk_category_id:new FormControl(null,[Validators.required]),
    });

    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
      this.cat=data;
    });
    this._custdata.getAllCustomer().subscribe((data:Cust[])=>{
      this.cust=data;
    });
    this._bookbartdata.getAllBookforbarter().subscribe((data:Bookbart[])=>{
      this.book=data;
    });



    this.bookreview_id=this._actRoute.snapshot.params['bookreview_id'];
    console.log(this.bookreview_id);
    this._editbookrev.getBookreviewById(this.bookreview_id).subscribe((data:any)=>{
      console.log(data);
      this.bookreviewadd.patchValue({
        fk_bookbarter_id:data[0].fk_bookbarter_id,
        //bookreview_id:data[0].bookreview_id,
        bookreview_description:data[0].bookreview_description,
        bookreview_date:data[0].bookreview_date,
        fk_customer_id:data[0].fk_customer_id,
        fk_category_id:data[0].fk_category_id
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
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/bookreview']);
    }
  }
  onClearDescClick(){
    this._router.navigate(['/bookreview']);
  }
}
