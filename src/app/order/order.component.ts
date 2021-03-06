import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Ord  } from "./ord";
import { OrderService } from "../order.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderdetailspopupComponent } from './orderdetailspopup/orderdetailspopup.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['order_id','order_date', 'order_status', 'order_paymenttype', 'order_totalamount','customer_name','action','details'];
  dataSource: MatTableDataSource<Ord>;
  orderaccrej:string[]=['Accept','Reject'];
  obj:Ord[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _orddata:OrderService,private _router:Router,private _actRoute:ActivatedRoute,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this._orddata.getAllOrders().subscribe((data:Ord[])=>{
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
onEditClick(item:Ord){
  this._router.navigate(['/home/editorder',item.order_id]);
 }
 onAddClick():void{
  this._router.navigate(['/home/addorder']);
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

  this._orddata.editOrder(row).subscribe((data:any)=>{
    console.log(data);
    if(data.affectedRows==1)
       {
         this.obj.splice(this.obj.indexOf(row),1);
         this.dataSource.data=this.obj;
         alert('Order accepted');
       }
       else{
         alert('Something went wrong');
         console.log(data);
       }
   },
   function(err){
     console.log(err);
   });
  //this._router.navigate(['/home/employeeassign']);

 }

}
