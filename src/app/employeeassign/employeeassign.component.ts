import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { EmployeeService } from "src/app/employee.service";
import { OrderService } from "src/app/order.service";
import { Ord } from "src/app/order/ord";
import { Empdel } from "src/app/employeedelivery/empdel";
import { EmployeedeliveryService } from "src/app/employeedelivery.service";
import { Router } from '@angular/router';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderdetailspopupComponent } from '../order/orderdetailspopup/orderdetailspopup.component';
import { EmployeeassignService } from '../employeeassign.service';

@Component({
  selector: 'app-employeeassign',
  templateUrl: './employeeassign.component.html',
  styleUrls: ['./employeeassign.component.css']
})
export class EmployeeassignComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = ['order_id','order_date', 'order_status', 'order_paymenttype', 'order_totalamount','customer_name','action','details'];
  dataSource: MatTableDataSource<Ord>;
  obj:Ord[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _orddata:OrderService,private _router:Router,private _actRoute:ActivatedRoute,public dialog: MatDialog,private _empassdata:EmployeeassignService) {
    this.dataSource = new MatTableDataSource();
   }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {
    this._empassdata.getAllOrders().subscribe((data:Ord[])=>{
      this.obj=data;
      this.dataSource.data=data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDeleteClick(item: Ord) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._orddata.deleteOrder(item.order_id).subscribe((data:any)=>{
       console.log(data);
       if(data.affectedRows==1)
       {
         this.obj.splice(this.obj.indexOf(item),1);
          this.dataSource.data=this.obj;
         alert('Deleted Successfully');
       }
       else{
         alert('Something went wrong');
         console.log(data);
       }
     });
   }
}
onAddClick():void{
  this._router.navigate(['/home/addorder']);
 }
onEditClick(item:Ord){
  this._router.navigate(['/home/editorder',item.order_id]);
 }
 onDetailsClick(item:Ord){
  console.log(item.order_id);
  const abc =this.dialog.open(OrderdetailspopupComponent, {
    data:item.order_id
  });

  abc.afterClosed().subscribe((x) => {
    console.log(x);
  });

 }
 onsignupClick(row:Ord):void{
  // this._orddata.editOrder(row).subscribe((data:any)=>{
  //      this._router.navigate(['/home/employeeassign']);

  //  },
  //  function(err){
  //    console.log(err);
  //  });
  this._router.navigate(['/home/employeeassign']);

 }

}
