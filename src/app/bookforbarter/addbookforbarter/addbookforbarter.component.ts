import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { BookforbarterService } from "src/app/bookforbarter.service";
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';
import { Bookbart } from "../bookbart";

@Component({
  selector: 'app-addbookforbarter',
  templateUrl: './addbookforbarter.component.html',
  styleUrls: ['./addbookforbarter.component.css']
})
export class AddbookforbarterComponent implements OnInit {

  constructor(private _bookbartdata:BookforbarterService,private _custdata:CustomerService,private _router:Router) { }

  bookforbarteradd:FormGroup;
  flag: boolean = false;
  obj:Bookbart[]=[];
  cust:Cust[]=[];
  ngOnInit(): void {

    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null,[Validators.required]),
      bookbarter_title:new FormControl(null,[Validators.required]),
      bookbarter_author:new FormControl(null,[Validators.required]),
      bookbarter_status:new FormControl(null,[Validators.required]),
      bookbarter_price:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      fk_customer_id:new FormControl(null,[Validators.required]),
    });

    this._custdata.getAllCustomer().subscribe((data:Cust[])=>{
      this.cust=data;
    });
  }


  onsubmitClick()
  {
    this._bookbartdata.addBookforbarter(this.bookforbarteradd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
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
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/bookforbarter']);
    }
  }
  onClearClick(){
    this.bookforbarteradd.get('bookbarter_title').reset('');
  }
  onClearPriceClick(){
    this.bookforbarteradd.get('bookbarter_price').reset('');
  }
  onClearAuthorClick(){
    this.bookforbarteradd.get('bookbarter_author').reset('');
  }

}
