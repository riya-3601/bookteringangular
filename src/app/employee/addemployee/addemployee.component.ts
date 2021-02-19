import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { Emp } from "../emp";
import { EmployeeService } from "src/app/employee.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  constructor(private _Empdata:EmployeeService,private _router:Router) { }

  obj:Emp[]=[];
  employeeadd:FormGroup;
  flag: boolean = false;
  ngOnInit(): void {

    this.employeeadd=new FormGroup({
      employee_id:new FormControl(null,[Validators.required]),
      employee_name:new FormControl(null,[Validators.required]),
      employee_mobileno:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10)]),
      employee_password:new FormControl(null,[Validators.required,Validators.maxLength(8)]),
    });
  }


  onsubmitClick()
  {
    this._Empdata.addEmployee(this.employeeadd.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
      {
       // this.obj.push(this.bookforbarteradd.value);
       alert('Row successfully inserted');
       this._router.navigate(['/home/employee']);
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
      this._router.navigate(['/home/employee']);
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
