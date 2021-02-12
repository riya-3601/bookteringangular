import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Orddet } from "./orddet";
import { OrderdetailsService } from "../orderdetails.service";

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  obj:Orddet[]=[];
  Orderdetailsadd:FormGroup;
  flag: boolean = false;
  constructor(private _orddetdata:OrderdetailsService,private _router:Router) { }

  ngOnInit(): void {

    this.Orderdetailsadd=new FormGroup({
      orderdetails_id:new FormControl(null),
      orderdetails_quantity:new FormControl(null),
      fk_order_id:new FormControl(null),
      fk_book_id:new FormControl(null),
    });



    this._orddetdata.getAllOrderdetails().subscribe((data:Orddet[])=>{
      this.obj=data;
    });
  }

  onDeleteClick(item: Orddet) {
    this._orddetdata.deleteOrderdetails(item.orderdetails_id).subscribe((data:any)=>{
      if(confirm('Are you sure you want to delete?'))
      {
      if(data.affectedRows==1)
      {
        this.obj.splice(this.obj.indexOf(item),1);
        alert('Deleted successfully');
      }
      else
      {
        console.log(data);
        alert('Something went wrong');
      }
    }
    })

}

onEditClick(item:Orddet){
 this._router.navigate(['/editorderdetails',item.orderdetails_id]);
}
}
