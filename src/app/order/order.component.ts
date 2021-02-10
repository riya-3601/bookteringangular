import { Component, OnInit } from '@angular/core';
import { Ord  } from "./ord";
import { OrderService } from "../order.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order_id:number;
  order_date:string;
  order_status:string;
  order_paymenttype:string;
  order_totalamount:number;
  fk_category_id:number;
  customer_name:string;
  obj:Ord[]=[];
  flag: boolean = false;
  constructor(private _orddata:OrderService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._orddata.getAllOrders().subscribe((data:Ord[])=>{
      this.obj=data;
    });
  }
  onDeleteClick(item: Ord) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._orddata.deleteOrder(item.order_id).subscribe((data:any)=>{
       console.log(data);
       if(data.affectedRows==1)
       {
         this.obj.splice(this.obj.indexOf((item),1));
         alert('Deleted Successfully');
       }
       else{
         alert('Something went wrong');
         console.log(data);
       }
     });
   }
}
onEditClick(item:Ord){
  this._router.navigate(['/editorder',item.order_id]);
 }
}
