import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressbookService } from "src/app/addressbook.service";
import { CustomerService } from "src/app/customer.service";
import { Address } from "../address";
import { Cust } from 'src/app/customer/cust';
@Component({
  selector: 'app-editaddressbook',
  templateUrl: './editaddressbook.component.html',
  styleUrls: ['./editaddressbook.component.css']
})
export class EditaddressbookComponent implements OnInit {
  address_id=1;
  cust:Cust[]=[];
  addressform:FormGroup;
  applicant: any;
  constructor(private _actRoute:ActivatedRoute,private _editaddress:AddressbookService,private _router:Router,private _custdata:CustomerService) { }

  ngOnInit(): void {
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
    this.address_id=this._actRoute.snapshot.params['address_id'];
    console.log(this.address_id);
    this._editaddress.getAddressbookById(this.address_id).subscribe((data:Address[])=>{
      console.log(data);
      this.addressform.patchValue({
        address_id:data[0].address_id,
        address_1:data[0].address_1,
        address_2:data[0].address_2,
        city:data[0].city,
        state:data[0].state,
        pincode:data[0].pincode,
        address_type:data[0].address_type,
        fk_customer_id:data[0].fk_customer_id,
      });
    });
    this._custdata.getAllCustomer().subscribe(
      (data:Cust[])=>{
        this.cust=data;
      }
     )}
  onEditAddressbook(){
    this._editaddress.editAddressbook(this.addressform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data updated succesfully');
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
  onCancleClick(){
    this._router.navigate(['/addressbook']);
  }
}
