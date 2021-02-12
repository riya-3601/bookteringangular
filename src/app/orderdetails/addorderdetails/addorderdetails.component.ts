import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Orddet } from "../orddet";
import { OrderdetailsService } from "src/app/orderdetails.service";

@Component({
  selector: 'app-addorderdetails',
  templateUrl: './addorderdetails.component.html',
  styleUrls: ['./addorderdetails.component.css']
})
export class AddorderdetailsComponent implements OnInit {

  obj:Orddet[]=[];
  Orderdetailsadd:FormGroup;
  flag: boolean = false;
  constructor(private _orddetdata:OrderdetailsService) { }

  ngOnInit(): void {
    this.Orderdetailsadd=new FormGroup({
      orderdetails_id:new FormControl(null),
      orderdetails_quantity:new FormControl(null),
      fk_order_id:new FormControl(null),
      fk_book_id:new FormControl(null),
    });
  }

  onsubmitClick()
  {
    this._orddetdata.addOrderdetails(this.Orderdetailsadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
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
