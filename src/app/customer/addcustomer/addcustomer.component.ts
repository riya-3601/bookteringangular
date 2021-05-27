import { Component, OnInit } from '@angular/core';
import { CustomerService } from "src/app/customer.service";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Cust } from 'src/app/customer/cust';
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  addcustomerform :FormGroup;
  applicant: any;
  customergender:string[]=['Male','Female','Others'];
  constructor(private _addcustdata:CustomerService,private _custdata:CustomerService,private _router:Router) { }

  ngOnInit(): void {
    this.addcustomerform=new FormGroup({
      customer_id:new FormControl(null),
      customer_emailid:new FormControl(null,[Validators.required,Validators.email]),
      customer_password:new FormControl(null),
      customer_name:new FormControl(null),
      customer_gender:new FormControl(null,Validators.required),
      customer_mobileno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),

    });
  }
  onsignupClick(){

    this._addcustdata.addCustomer(this.addcustomerform.value).subscribe((data:any)=>{
     if(data.affectedRows==1)
      {
        alert('Data inserted succesfully');
        this._router.navigate(['/home/customer']);
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
      this._router.navigate(['/home/customer']);
    }
 }

}
