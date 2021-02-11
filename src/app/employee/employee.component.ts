import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Emp } from "./emp";
import { EmployeeService } from "../employee.service";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  obj:Emp[]=[];
  employeeadd:FormGroup;
  flag: boolean = false;
  constructor(private _empdata:EmployeeService,private _router:Router) { }

  ngOnInit(): void {

    this.employeeadd=new FormGroup({
      employee_id:new FormControl(null),
      employee_name:new FormControl(null),
      employee_mobileno:new FormControl(null),
      employee_password:new FormControl(null),
    });



    this._empdata.getAllEmployee().subscribe((data:Emp[])=>{
      this.obj=data;
    });
  }

  onDeleteClick(item: Emp) {
    this._empdata.deleteEmployee(item.employee_id).subscribe((data:any)=>{
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

onEditClick(item:Emp){
 this._router.navigate(['/editemployee',item.employee_id]);
  }
}
