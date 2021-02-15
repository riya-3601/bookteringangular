import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { AddressbookService } from "src/app/addressbook.service";
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';
import { Router } from "@angular/router";
@Component({
  selector: 'app-addaddressbook',
  templateUrl: './addaddressbook.component.html',
  styleUrls: ['./addaddressbook.component.css']
})
export class AddaddressbookComponent implements OnInit {
  cust:Cust[]=[];
  addressform:FormGroup;
  applicant: any;
  constructor(private _addressdata:AddressbookService,private _custdata:CustomerService,private _router:Router) { }

  ngOnInit(): void {
    this._custdata.getAllCustomer().subscribe(
      (data:Cust[])=>{
        this.cust=data;
      }
    );

    this.addressform=new FormGroup({
      address_id:new FormControl(null),
      address_1:new FormControl(null,Validators.required),
      address_2:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required),
      state:new FormControl(null,Validators.required),
      pincode:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      address_type:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
  }
  onsignupClick():void{

    this._addressdata.addAddressbook(this.addressform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');
         this._router.navigate(['/addressbook']);
       }
       else{
         alert('Something went wrong');
         console.log(data);
       }

     },
     function(err){
       console.log(err);
     });

  }
  onCancleClick():void{
    if(confirm("Are you sure you want to Cancle?"))
    {
      this._router.navigate(['/addressbook']);
    }
 }
}
