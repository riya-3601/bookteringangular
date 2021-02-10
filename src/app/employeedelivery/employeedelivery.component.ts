import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Empdel } from "./empdel";
import { EmployeedeliveryService } from "../employeedelivery.service";

@Component({
  selector: 'app-employeedelivery',
  templateUrl: './employeedelivery.component.html',
  styleUrls: ['./employeedelivery.component.css']
})
export class EmployeedeliveryComponent implements OnInit {

  obj:Empdel[]=[];
  employeedeliveryadd:FormGroup;
  flag: boolean = false;
  constructor(private _empdeldata:EmployeedeliveryService,private _router:Router) { }

  ngOnInit(): void {

    this.employeedeliveryadd=new FormGroup({
      delivery_id:new FormControl(null),
      delivery_status:new FormControl(null),
      fk_employee_id:new FormControl(null),
      fk_order_id:new FormControl(null),
    });



    this._empdeldata.getAllEmployeedelivery().subscribe((data:Empdel[])=>{
      this.obj=data;
    });
  }


  onDeleteClick(item: Empdel) {
    this._empdeldata.deleteEmployeedelivery(item.delivery_id).subscribe((data:any)=>{
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

onEditClick(item:Empdel){
 this._router.navigate(['/editemployeedelivery',item.delivery_id]);
}
}
