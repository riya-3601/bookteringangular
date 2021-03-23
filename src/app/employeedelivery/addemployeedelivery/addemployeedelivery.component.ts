import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Empdel } from "../empdel";
import { EmployeedeliveryService } from "src/app/employeedelivery.service";
import { Router } from '@angular/router';
import { Emp } from 'src/app/employee/emp';
import { EmployeeService } from 'src/app/employee.service';
import { OrderService } from 'src/app/order.service';
import { Ord } from 'src/app/order/ord';

@Component({
  selector: 'app-addemployeedelivery',
  templateUrl: './addemployeedelivery.component.html',
  styleUrls: ['./addemployeedelivery.component.css']
})
export class AddemployeedeliveryComponent implements OnInit {

  constructor(private _empdeldata:EmployeedeliveryService,private _empdata:EmployeeService,private _orddata:OrderService,private _router:Router) { }
  emp:Emp[]=[];
  obj:Empdel[]=[];
  ord:Ord[]=[];
  employeedeliveryadd:FormGroup;
  flag: boolean = false;
  delstatus:String[]=['Assigned','Packed','Out for Delivery','Delivered'];
  ngOnInit(): void {

    this._empdata.getAllEmployee().subscribe((data:Emp[])=>{
      this.emp=data;
    });
    this._orddata.getAllOrders().subscribe((data:Ord[])=>{
      this.ord=data;
    });

    this.employeedeliveryadd=new FormGroup({
      delivery_id:new FormControl(null),
      delivery_status:new FormControl(null,[Validators.required]),
      fk_employee_id:new FormControl(null,[Validators.required]),
      fk_order_id:new FormControl(null,[Validators.required]),
    });
  }

  onsubmitClick()
  {
    this._empdeldata.addEmployeedelivery(this.employeedeliveryadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
       this._router.navigate(['/home/employeedelivery']);
      }
      else
      {
        alert('Something went wrong');
        console.log(data);
      }
    },function(err){
      console.log(err);
    });
  }
  onCancelClick(): void {
    //this.flag = false;
    if(confirm('Are you sure you want to cancel?')){
    this._router.navigate(['/home/employeedelivery']);
    }
  }

}
