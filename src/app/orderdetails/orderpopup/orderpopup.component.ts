import { Component, Inject, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderdetailsService } from 'src/app/orderdetails.service';
import { Orddet } from '../orddet';

@Component({
  selector: 'app-orderpopup',
  templateUrl: './orderpopup.component.html',
  styleUrls: ['./orderpopup.component.css']
})
export class OrderpopupComponent implements OnInit {
  obj:Orddet[]=[];
  displayedColumns: string[]=['book_title','orderdetails_quantity','delivery_status','employee_name','employee_mobileno'];
  dataSource: MatTableDataSource<Orddet>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogref:MatDialogRef<OrderpopupComponent>,private _orddetdata:OrderdetailsService ,@Inject(MAT_DIALOG_DATA) public data: any,private _router:Router) {
    this.dataSource = new MatTableDataSource();
  }

    ngAfterViewInit(): void {
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    }


  ngOnInit(): void {
    //console.log(this.data);
    this._orddetdata.getOrderdetailsById(this.data).subscribe((data:Orddet[])=>{
        this.obj=data;
        this.dataSource.data=data;
        console.log(this.dataSource.data);
      });

  }

}
