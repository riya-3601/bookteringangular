import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Emp } from "../emp";
import { EmployeeService } from "src/app/employee.service";

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  constructor(private _Empdata:EmployeeService) { }

  obj:Emp[]=[];
  employeeadd:FormGroup;
  flag: boolean = false;
  ngOnInit(): void {

    this.employeeadd=new FormGroup({
      employee_id:new FormControl(null),
      employee_name:new FormControl(null),
      employee_mobileno:new FormControl(null),
      employee_password:new FormControl(null),
    });
  }


  onsubmitClick()
  {
    this._Empdata.addEmployee(this.employeeadd.value).subscribe((data:any)=>{
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
