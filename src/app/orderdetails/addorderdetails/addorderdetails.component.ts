import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Orddet } from "../orddet";
import { OrderdetailsService } from "src/app/orderdetails.service";
import { Bfs } from "src/app/bookforsale/bfs";
import { Ord } from 'src/app/order/ord';
import { Router } from '@angular/router';
import { BookforsaleService } from 'src/app/bookforsale.service';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-addorderdetails',
  templateUrl: './addorderdetails.component.html',
  styleUrls: ['./addorderdetails.component.css']
})
export class AddorderdetailsComponent implements OnInit {
  book:Bfs[]=[];
  obj:Orddet[]=[];
  order:Ord[]=[];
  Orderdetailsadd:FormGroup;
  flag: boolean = false;
  constructor(private _orddetdata:OrderdetailsService,private _router:Router,private _bookdata:BookforsaleService,private _orddata:OrderService) { }

  ngOnInit(): void {
    this.Orderdetailsadd=new FormGroup({
      orderdetails_id:new FormControl(null,[Validators.required]),
      orderdetails_quantity:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      fk_order_id:new FormControl(null,[Validators.required]),
      fk_book_id:new FormControl(null,[Validators.required]),
    });

    this._bookdata.getAllBookforsale().subscribe((data:Bfs[])=>{
      this.book=data;
    });

    this._orddata.getAllOrders().subscribe((data:Ord[])=>{
      this.order=data;
    });
  }

  onsubmitClick()
  {
    this._orddetdata.addOrderdetails(this.Orderdetailsadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
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
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/orderdetails']);
    }
  }
  onClearClick(){
    this.Orderdetailsadd.get('orderdetails_quantity').reset('');
  }
}
