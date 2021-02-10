import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Empdel } from "../empdel";
import { EmployeedeliveryService } from "src/app/employeedelivery.service";

@Component({
  selector: 'app-addemployeedelivery',
  templateUrl: './addemployeedelivery.component.html',
  styleUrls: ['./addemployeedelivery.component.css']
})
export class AddemployeedeliveryComponent implements OnInit {

  constructor(private _empdeldata:EmployeedeliveryService) { }

  obj:Empdel[]=[];
  employeedeliveryadd:FormGroup;
  flag: boolean = false;
  ngOnInit(): void {

    this.employeedeliveryadd=new FormGroup({
      delivery_id:new FormControl(null),
      delivery_status:new FormControl(null),
      fk_employee_id:new FormControl(null),
      fk_order_id:new FormControl(null),
    });
  }

  onsubmitClick()
  {
    this._empdeldata.addEmployeedelivery(this.employeedeliveryadd.value).subscribe((data:any)=>{
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
