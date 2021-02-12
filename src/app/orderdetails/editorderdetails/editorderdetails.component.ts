import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { OrderdetailsService } from "src/app/orderdetails.service";


@Component({
  selector: 'app-editorderdetails',
  templateUrl: './editorderdetails.component.html',
  styleUrls: ['./editorderdetails.component.css']
})
export class EditorderdetailsComponent implements OnInit {

  Orderdetailsadd:FormGroup;
  flag: boolean = false;
  orderdetails_id;
  constructor(private _editorddet:OrderdetailsService,private _actRoute:ActivatedRoute,private _router:Router) { }


  ngOnInit(): void {
    this.Orderdetailsadd=new FormGroup({
      orderdetails_id:new FormControl(null),
      orderdetails_quantity:new FormControl(null),
      fk_order_id:new FormControl(null),
      fk_book_id:new FormControl(null),
    });

    this.orderdetails_id=this._actRoute.snapshot.params['orderdetails_id'];
    console.log(this.orderdetails_id);
    this._editorddet.getOrderdetailsById(this.orderdetails_id).subscribe((data:any)=>{
      console.log(data);
      this.Orderdetailsadd.patchValue({
        orderdetails_id:data[0].orderdetails_id,
        orderdetails_quantity:data[0].orderdetails_quantity,
        fk_order_id:data[0].fk_order_id,
        fk_book_id:data[0].fk_book_id
      });
    });
  }


  onEditClick()
  {
    this._editorddet.editOrderdetails(this.Orderdetailsadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row updated successfully');
       this._router.navigate(['/orderdetails']);
      }
      else
      {
        alert('Something went wrong');
      }
    },function(err){
      console.log(err);
    });
  }
  onCancelClick(): void {
    this.flag = false;
  }
}
