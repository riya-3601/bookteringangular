import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';
import {  OrderService} from "src/app/order.service";
@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {
  cust:Cust[]=[];
  orderstatus:string[]=['Reached','failed','On Hold','Pending Payment','Processing','Canceled']
  ordform:FormGroup;
  applicant: any;
  constructor(private _orddata:OrderService,private _custdata:CustomerService) { }

  ngOnInit(): void {

    this._custdata.getAllCustomer().subscribe(
      (data:Cust[])=>{
        this.cust=data;
      }
    );

    this.ordform=new FormGroup({
      order_id:new FormControl(null),
      order_date:new FormControl(null),
      order_status:new FormControl(null),
      order_paymenttype:new FormControl(null),
      order_totalamount:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
  }
  updateDOB(dateObject) {
    // convert object to string then trim it to yyyy-mm-dd
    const stringified = JSON.stringify(dateObject.value);
    const dob = stringified.substring(1, 11);
    this.applicant.contact[0].dob = dob;
  }
  onsignupClick():void{

    //console.log(this.ordform.value);
    this._orddata.addorder(this.ordform.value).subscribe((data:any)=>{

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
