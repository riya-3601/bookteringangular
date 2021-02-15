import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BookforbarterService } from "src/app/bookforbarter.service";
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';

@Component({
  selector: 'app-editbookforbarter',
  templateUrl: './editbookforbarter.component.html',
  styleUrls: ['./editbookforbarter.component.css']
})
export class EditbookforbarterComponent implements OnInit {

  constructor(private _editbookbart:BookforbarterService,private _actRoute:ActivatedRoute,private _router:Router,private _custdata:CustomerService) { }
  cust:Cust[]=[];
  bookforbarteradd:FormGroup;
  flag: boolean = false;
  bookbarter_id;
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
        fk_customer_id:data[0].fk_customer_id
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
        console.log(data);
      }
    },function(err){
      console.log(err);
    });
  }
  onCancelClick(): void {
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
