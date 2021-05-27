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
  selectedfile:File=null;
  ngOnInit(): void {

    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null,[Validators.required]),
      bookbarter_title:new FormControl(null,[Validators.required]),
      bookbarter_author:new FormControl(null,[Validators.required]),
      bookbarter_description:new FormControl(null,[Validators.required,Validators.maxLength(200)]),
      bookbarter_status:new FormControl(null,[Validators.required]),
      bookbarter_price:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      bookbarter_image:new FormControl(null),
      fk_customer_id:new FormControl(null,[Validators.required]),
    });

    this._custdata.getAllCustomer().subscribe((data:Cust[])=>{
      this.cust=data;
    });
  }


  onsubmitClick()
  {
    if(this.imageFlag){
    const fd=new FormData();
    fd.append('bookbarter_title',this.bookforbarteradd.get('bookbarter_title').value);
    fd.append('bookbarter_author',this.bookforbarteradd.get('bookbarter_author').value);
    fd.append('bookbarter_description',this.bookforbarteradd.get('bookbarter_description').value);
    fd.append('bookbarter_status',this.bookforbarteradd.get('bookbarter_status').value);
    fd.append('bookbarter_price',this.bookforbarteradd.get('bookbarter_price').value);
    fd.append('bookbarter_image',this.selectedfile,this.selectedfile.name);
    fd.append('fk_customer_id',this.bookforbarteradd.get('fk_customer_id').value);
    console.log(fd);


    this._bookbartdata.addBookforbarter(fd).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
       this._router.navigate(['/home/bookforbarter']);
      }
      else
      {
        alert('Something went wrong');
      }
    },function(err){
      console.log(err);
    });
  }
  else{
    alert('File format Not supported');
  }
  }
  onCancelClick(): void {
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/home/bookforbarter']);
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
  onClearDescClick(){
    this.bookforbarteradd.get('bookbarter_description').reset('');
  }
  imageFlag:boolean=true;
  onFileAdd(value){

    this.selectedfile=<File>value.target.files[0];
    if(this.selectedfile.type=='image/png'|| this.selectedfile.type=='image/jpg'|| this.selectedfile.type=='image/jpeg'){
      this.imageFlag=true;
    }
    else{
      this.imageFlag=false;
      this.selectedfile=null;
    }
    console.log(this.selectedfile);
   }
}
