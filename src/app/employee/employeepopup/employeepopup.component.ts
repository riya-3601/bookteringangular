import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Empdel } from "src/app/employeedelivery/Empdel";
import { EmployeedeliveryService } from "src/app/employeedelivery.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employeepopup',
  templateUrl: './employeepopup.component.html',
  styleUrls: ['./employeepopup.component.css']
})
export class EmployeepopupComponent implements OnInit {

  displayedColumns: string[] = ['order_id','delivery_status', 'order_date','order_paymenttype', 'order_totalamount','customer_name','customer_mobileno','address_1','action'];
  dataSource: MatTableDataSource<Empdel>;

  obj:Empdel[]=[];
  employeedeliveryadd:FormGroup;
  flag: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogref: MatDialogRef<EmployeepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _empdeldata:EmployeedeliveryService,private _router:Router) {
    this.dataSource = new MatTableDataSource();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {

    this.employeedeliveryadd=new FormGroup({
      delivery_id:new FormControl(null),
      delivery_status:new FormControl(null),
      fk_employee_id:new FormControl(null),
      fk_order_id:new FormControl(null),
    });


  this._empdeldata.getEmployeeDeliveryByEmployeeId(this.data).subscribe((data:Empdel[])=>{
     this.dataSource.data=data;
    console.log(data);
  });

    // this._empdeldata.getAllEmployeedelivery().subscribe((data:Empdel[])=>{
    //   this.obj=data;
    //   this.dataSource.data=data;
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddEmpdelClick(){
    this._router.navigate(['/home/addemployeedelivery']);
  }
  onDeleteClick(item: Empdel) {
    this._empdeldata.deleteEmployeedelivery(item.delivery_id).subscribe((data:any)=>{
      if(confirm('Are you sure you want to delete?'))
      {
      if(data.affectedRows==1)
      {
        this.obj.splice(this.obj.indexOf(item),1);
        this.dataSource.data=this.obj;
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
 this._router.navigate(['/home/editemployeedelivery',item.delivery_id]);
}
}

