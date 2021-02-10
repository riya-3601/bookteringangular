import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from "src/app/order.service";
import { Ord } from "../ord";
@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {
  order_id=1;
  ordform:FormGroup;
  constructor(private _actRoute:ActivatedRoute,private _editorder:OrderService,private _router:Router) { }

  ngOnInit(): void {
    this.ordform=new FormGroup({
      order_id:new FormControl(null),
      order_date:new FormControl(null),
      order_status:new FormControl(null),
      order_paymenttype:new FormControl(null),
      order_totalamount:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
    this.order_id=this._actRoute.snapshot.params['order_id'];
    console.log(this.order_id);
    this._editorder.getOrderById(this.order_id).subscribe((data:Ord[])=>{
      console.log(data);
      this.ordform.patchValue({
        order_id:data[0].order_id,
        order_date:data[0].order_date,
        order_status:data[0].order_status,
        order_paymenttype:data[0].order_paymenttype,
        order_totalamount:data[0].order_totalamount,
        fk_customer_id:data[0].fk_customer_id,
      });
    });
  }
  onEditCategory(){
    this._editorder.editOrder(this.ordform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data updated succesfully');
        this._router.navigate(['/order']);

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
