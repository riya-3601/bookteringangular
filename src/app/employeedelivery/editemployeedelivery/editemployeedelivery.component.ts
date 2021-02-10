import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeedeliveryService } from "src/app/employeedelivery.service";

@Component({
  selector: 'app-editemployeedelivery',
  templateUrl: './editemployeedelivery.component.html',
  styleUrls: ['./editemployeedelivery.component.css']
})
export class EditemployeedeliveryComponent implements OnInit {

  constructor(private _editempdel:EmployeedeliveryService,private _actRoute:ActivatedRoute,private _router:Router) { }
  employeedeliveryadd:FormGroup;
  flag: boolean = false;
  delivery_id;

  ngOnInit(): void {
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
      });
    });
  }

  onEditClick()
  {
    this._editempdel.editEmployeedelivery(this.employeedeliveryadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row updated successfully');
       this._router.navigate(['/employeedelivery']);
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
