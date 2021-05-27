import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { OrderdetailsService } from 'src/app/orderdetails.service';
import { Orddet } from 'src/app/orderdetails/orddet';
import { FormGroup,FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";

@Component({
  selector: 'app-orderdetailspopup',
  templateUrl: './orderdetailspopup.component.html',
  styleUrls: ['./orderdetailspopup.component.css']
})
export class OrderdetailspopupComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[]=['book_title','orderdetails_quantity'];
  dataSource: MatTableDataSource<Orddet>;
  obj:Orddet[]=[];
  ordform:FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogref:MatDialogRef<OrderdetailspopupComponent> ,@Inject(MAT_DIALOG_DATA) public data: any,private _orddetail:OrderdetailsService,private _router:Router) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    // this.ordform=new FormGroup({
    //   book_title:new FormControl(null),
    //   orderdetails_quantity:new FormControl(null)
    // });
    console.log(this.data);
      this._orddetail.getOrderdetailsByOrderId(this.data).subscribe((data:Orddet[])=>{
         this.dataSource.data=data;
          console.log(data);

        });
  }

}
