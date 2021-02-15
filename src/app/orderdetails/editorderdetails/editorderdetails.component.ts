import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BookforsaleService } from 'src/app/bookforsale.service';
import { Bfs } from 'src/app/bookforsale/bfs';
import { OrderService } from 'src/app/order.service';
import { Ord } from 'src/app/order/ord';
import { OrderdetailsService } from "src/app/orderdetails.service";
import { Orddet } from '../orddet';


@Component({
  selector: 'app-editorderdetails',
  templateUrl: './editorderdetails.component.html',
  styleUrls: ['./editorderdetails.component.css']
})
export class EditorderdetailsComponent implements OnInit {
  book:Bfs[]=[];
  obj:Orddet[]=[];
  order:Ord[]=[]
  Orderdetailsadd:FormGroup;
  flag: boolean = false;
  orderdetails_id;
  constructor(private _editorddet:OrderdetailsService,private _actRoute:ActivatedRoute,private _router:Router,private _bookdata:BookforsaleService,private _orddata:OrderService) { }


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

    this.orderdetails_id=this._actRoute.snapshot.params['orderdetails_id'];
    console.log(this.orderdetails_id);
    this._editorddet.getOrderdetailsById(this.orderdetails_id).subscribe((data:any)=>{
      console.log(data);
      this.Orderdetailsadd.patchValue({
        //orderdetails_id:data[0].orderdetails_id,
        fk_book_id:data[0].fk_book_id,
        fk_order_id:data[0].fk_order_id,
        orderdetails_quantity:data[0].orderdetails_quantity,
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
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/bookforbarter']);
    }
  }
  onClearClick(){
    this.Orderdetailsadd.get('orderdetails_quantity').reset('');
  }
}
