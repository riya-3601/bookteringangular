import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Orddet } from "./orddet";
import { OrderdetailsService } from "../orderdetails.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['book_title','orderdetails_quantity', 'order_date','order_status', 'order_paymenttype','order_totalamount','customer_name','customer_mobileno','action'];
  dataSource: MatTableDataSource<Orddet>;
  obj:Orddet[]=[];
  Orderdetailsadd:FormGroup;
  flag: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _orddetdata:OrderdetailsService,private _router:Router) {
    this.dataSource = new MatTableDataSource();
   }

   ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {

    this.Orderdetailsadd=new FormGroup({
      orderdetails_id:new FormControl(null),
      orderdetails_quantity:new FormControl(null),
      fk_order_id:new FormControl(null),
      fk_book_id:new FormControl(null),
    });



    this._orddetdata.getAllOrderdetails().subscribe((data:Orddet[])=>{
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
  onDeleteClick(item: Orddet) {
    this._orddetdata.deleteOrderdetails(item.orderdetails_id).subscribe((data:any)=>{
      if(confirm('Are you sure you want to delete?'))
      {
      if(data.affectedRows==1)
      {
        this.obj.splice(this.obj.indexOf(item),1);
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

onEditClick(item:Orddet){
 this._router.navigate(['/editorderdetails',item.orderdetails_id]);
}
onAddOrderdetailsClick(){
  this._router.navigate(['/addorderdetails']);
}
}
