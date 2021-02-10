import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  OrderService} from "src/app/order.service";
@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {
  ordform:FormGroup;
  constructor(private _orddata:OrderService) { }

  ngOnInit(): void {
    this.ordform=new FormGroup({
      order_id:new FormControl(null),
      order_date:new FormControl(null),
      order_status:new FormControl(null),
      order_paymenttype:new FormControl(null),
      order_totalamount:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
  }
  onsignupClick():void{

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
