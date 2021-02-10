import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Cust  } from "./cust";
import { CustomerService } from "../customer.service";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerform :FormGroup;
  obj:Cust[]=[];
  flag: boolean = false;
  constructor(private _custdata:CustomerService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._custdata.getAllCustomer().subscribe((data:Cust[])=>{
      this.obj=data;
    });
    this.customerform=new FormGroup({
      customer_id:new FormControl(null),
      customer_emailid:new FormControl(null),
      customer_password:new FormControl(null),
      customer_name:new FormControl(null),
      customer_gender:new FormControl(null),
      customer_mobileno:new FormControl(null),
    });
  }
  onDeleteClick(item: Cust) {
    if(confirm("Are you sure you want to delete?"))
   {
   this._custdata.deletecustomer(item.customer_id).subscribe((data:any)=>{

     if(data.affectedRows==1)
     {
       this.obj.splice(this.obj.indexOf(item),1);
       alert('Data deleted successfully');
     }
     else
     {
       console.log(data);
       alert('Something went wrong');
     }
   });
  }
  }
  onEditClick(item:Cust){
    this._router.navigate(['/editcustomer',item.customer_id]);
  }

}
