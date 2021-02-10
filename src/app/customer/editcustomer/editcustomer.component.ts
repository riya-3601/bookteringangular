import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { Cust } from "../cust";
@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {
  customer_id;
  editcustomerform:FormGroup;
  constructor(private _actRoute:ActivatedRoute,private _editcustomer:CustomerService,private _router:Router) { }

  ngOnInit(): void {
    this.editcustomerform=new FormGroup({
      customer_id:new FormControl(null),
      customer_emailid:new FormControl(null),
      customer_password:new FormControl(null),
      customer_name:new FormControl(null),
      customer_gender:new FormControl(null),
      customer_mobileno:new FormControl(null),
  });
  this.customer_id= this._actRoute.snapshot.params['customer_id'];
  console.log(this.customer_id);
  this._editcustomer.getCustomerbyId(this.customer_id).subscribe((data:Cust[])=>{
    console.log(data);
    this.editcustomerform.patchValue({
      customer_id:data[0].customer_id,
      customer_emailid:data[0].customer_emailid,
      customer_password:data[0].customer_password,
      customer_name:data[0].customer_name,
      customer_gender:data[0].customer_gender,
      customer_mobileno:data[0].customer_mobileno,
    });
  });
}
onEditcustClick(){
  this._editcustomer.editCustomer(this.editcustomerform.value).subscribe((data:any)=>{
    if(data.affectedRows==1)
     {
       alert('Data updated succesfully');
      this._router.navigate(['/customer']);

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
}
