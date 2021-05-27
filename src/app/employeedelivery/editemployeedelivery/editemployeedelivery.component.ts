import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Emp } from 'src/app/employee/emp';
import { EmployeedeliveryService } from "src/app/employeedelivery.service";
import { OrderService } from 'src/app/order.service';
import { Ord } from 'src/app/order/ord';
import { Empdel } from '../empdel';

@Component({
  selector: 'app-editemployeedelivery',
  templateUrl: './editemployeedelivery.component.html',
  styleUrls: ['./editemployeedelivery.component.css']
})
export class EditemployeedeliveryComponent implements OnInit {

  constructor(private _editempdel:EmployeedeliveryService,private _empdata:EmployeeService,private _orddata:OrderService,private _actRoute:ActivatedRoute,private _router:Router) { }
  employeedeliveryadd:FormGroup;
  flag: boolean = false;
  delivery_id;
  emp:Emp[]=[];
  obj:Empdel[]=[];
  ord:Ord[]=[];
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
      delivery_status:new FormControl(null),
      fk_employee_id:new FormControl(null),
      fk_order_id:new FormControl(null),

    });

    this.delivery_id=this._actRoute.snapshot.params['delivery_id'];
    console.log(this.delivery_id);
    this._editempdel.getEmployeedeliveryById(this.delivery_id).subscribe((data:any)=>{
      console.log(data);
      this.employeedeliveryadd.patchValue({
        delivery_id:data[0].delivery_id,
        delivery_status:data[0].delivery_status,
        fk_employee_id:data[0].fk_employee_id,
        fk_order_id:data[0].fk_order_id
      });
    });
  }

  onEditClick()
  {
    // this._orddata.getOrderById(this.employeedeliveryadd.get('fk_order_id').value).subscribe((data:Ord[])=>{
    //   console.log(data);
    // });
    this._editempdel.editEmployeedelivery(this.employeedeliveryadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row updated successfully');
       if(this.employeedeliveryadd.get('delivery_status').value=='Delivered'){
         this._orddata.editOrderDelivered(this.employeedeliveryadd.get('fk_order_id').value).subscribe((data:any)=>{
          console.log(data);
         });
       }
       this._router.navigate(['/home/employee']);
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
    if(confirm('Are you sure you want to cancel?')){
      this._router.navigate(['/home/employee']);
      }
    //this.flag = false;
  }
}
