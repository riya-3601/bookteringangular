import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';
import { OrderService} from "src/app/order.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {
  cust:Cust[]=[];
  orderstatus:string[]=['Confirmed','Failed','Delivered'];
  ordform:FormGroup;
  applicant: any;
  constructor(private _orddata:OrderService,private _custdata:CustomerService,private _router:Router) { }

  ngOnInit(): void {

    this._custdata.getAllCustomer().subscribe(
      (data:Cust[])=>{
        this.cust=data;
      }
    );

    this.ordform=new FormGroup({
      order_id:new FormControl(null),
      order_date:new FormControl(null,Validators.required),
      order_status:new FormControl(null,Validators.required),
      order_paymenttype:new FormControl(null,Validators.required),
      order_totalamount:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      fk_customer_id:new FormControl(null),
    });
  }

  onsignupClick():void{
    this._orddata.addorder(this.ordform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');
         this._router.navigate(['/home/order']);
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
  //  onClearClick():void{
  //     this.ordform.get('order_totalamount').reset('');
  //  }
   onCancleClick():void{
      if(confirm("Are you sure you want to Cancle?"))
      {
        this._router.navigate(['/home/order']);
      }
   }
}
