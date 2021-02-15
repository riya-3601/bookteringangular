import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from "src/app/employee.service";

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  flag: boolean = false;
  employeeadd:FormGroup;
  employee_id;
  constructor(private _editemp:EmployeeService,private _actRoute:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this.employeeadd=new FormGroup({
      employee_id:new FormControl(null,[Validators.required]),
      employee_name:new FormControl(null,[Validators.required]),
      employee_mobileno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),
      employee_password:new FormControl(null,[Validators.required,Validators.maxLength(8)]),
    });

    this.employee_id=this._actRoute.snapshot.params['employee_id'];
    console.log(this.employee_id);
    this._editemp.getEmployeeById(this.employee_id).subscribe((data:any)=>{
      console.log(data);
      this.employeeadd.patchValue({
        employee_id:data[0].employee_id,
        employee_name:data[0].employee_name,
        employee_mobileno:data[0].employee_mobileno,
        employee_password:data[0].employee_password
      });
    });
  }


  onEditClick()
  {
    this._editemp.editEmployee(this.employeeadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row updated successfully');
       this._router.navigate(['/employee']);
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
      this._router.navigate(['/employee']);
    }
  }
  onClearClick(){
    this.employeeadd.get('employee_name').reset('');
  }
  onClearMobClick(){
    this.employeeadd.get('employee_mobileno').reset('');
  }
  onClearPassClick(){
    this.employeeadd.get('employee_password').reset('');
  }
}
