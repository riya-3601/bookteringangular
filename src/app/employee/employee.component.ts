import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Emp } from "./emp";
import { EmployeeService } from "../employee.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = [ 'employee_name','employee_mobileno', 'employee_password','action'];
  dataSource: MatTableDataSource<Emp>;

  obj:Emp[]=[];
  employeeadd:FormGroup;
  flag: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _empdata:EmployeeService,private _router:Router) {
    this.dataSource = new MatTableDataSource();
   }

   ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {

    this.employeeadd=new FormGroup({
      employee_id:new FormControl(null),
      employee_name:new FormControl(null),
      employee_mobileno:new FormControl(null),
      employee_password:new FormControl(null),
    });



    this._empdata.getAllEmployee().subscribe((data:Emp[])=>{
      this.obj=data;
      this.dataSource.data=data;
      console.log(this.dataSource.data);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteClick(item: Emp) {
    this._empdata.deleteEmployee(item.employee_id).subscribe((data:any)=>{
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

onEditClick(item:Emp){
 this._router.navigate(['/editemployee',item.employee_id]);
  }
  onAddEmployeeClick(){
    this._router.navigate(['/addemployee']);
  }
}
