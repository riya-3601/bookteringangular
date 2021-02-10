import { Component, OnInit } from '@angular/core';
import { CustomerService } from "src/app/customer.service";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  addcustomerform :FormGroup;
  constructor(private _addcustdata:CustomerService) { }

  ngOnInit(): void {
    this.addcustomerform=new FormGroup({
      customer_id:new FormControl(null),
      customer_emailid:new FormControl(null),
      customer_password:new FormControl(null),
      customer_name:new FormControl(null),
      customer_gender:new FormControl(null),
      customer_mobileno:new FormControl(null),
    });
  }
  onsignupClick(){

    this._addcustdata.addCustomer(this.addcustomerform.value).subscribe((data:any)=>{
     if(data.affectedRows==1)
      {
        alert('Data inserted succesfully');
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
