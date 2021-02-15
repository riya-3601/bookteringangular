import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Bookrev } from "../bookrev";
import { BookreviewService } from "src/app/bookreview.service";
import { Cat } from 'src/app/category/cat';
import { CategoryService } from 'src/app/category.service';
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';
import { Bookbart } from 'src/app/bookforbarter/bookbart';
import { BookforbarterService } from 'src/app/bookforbarter.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addbookreview',
  templateUrl: './addbookreview.component.html',
  styleUrls: ['./addbookreview.component.css']
})
export class AddbookreviewComponent implements OnInit {

  constructor(private _bookrevdata:BookreviewService,private _catdata:CategoryService,private _custdata:CustomerService,private _bookbartdata:BookforbarterService,private _router:Router) { }

  cust:Cust[]=[];
  cat:Cat[]=[];
  book:Bookbart[]=[];
  obj:Bookrev[]=[];
  bookreviewadd:FormGroup;
  flag: boolean = false;
  ngOnInit(): void {


    this.bookreviewadd=new FormGroup({
      bookreview_id:new FormControl(null),
      bookreview_description:new FormControl(null,[Validators.required,Validators.maxLength(200)]),
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
  }

  onsubmitClick()
  {
    this._bookrevdata.addBookreview(this.bookreviewadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
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
    this.bookreviewadd.get('bookreview_description').reset('');
  }

}
