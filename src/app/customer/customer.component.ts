import { Component, OnInit ,AfterViewInit,ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Cust  } from "./cust";
import { CustomerService } from "../customer.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddressbookpopupComponent } from "./addressbookpopup/addressbookpopup.component";
import { Address } from '../addressbook/address';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] =['customer_emailid','customer_name','customer_gender','customer_mobileno','action','address_details'];
  dataSource: MatTableDataSource<Cust>;
  obj:Cust[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _custdata:CustomerService,private _router:Router,private _actRoute:ActivatedRoute,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {
    this._custdata.getAllCustomer().subscribe((data:Cust[])=>{
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
  onDeleteClick(item: Cust) {
    if(confirm("Are you sure you want to delete?"))
   {
   this._custdata.deletecustomer(item.customer_id).subscribe((data:any)=>{

     if(data.affectedRows==1)
     {
       this.obj.splice(this.obj.indexOf(item),1);
       this.dataSource.data=this.obj;
       alert('Data deleted successfully');
     }
     else
     {
       console.log(data);
       alert('Something went wrong');
     }
   });
  }
  }
  onEditClick(item:Cust){
    this._router.navigate(['/home/editcustomer',item.customer_id]);
  }
  onAddClick():void{
    this._router.navigate(['/home/addcustomer']);
   }
   onDetailsClick(item:Address){
    console.log(item.customer_id);
    const abc =this.dialog.open(AddressbookpopupComponent, {
      data:item.customer_id
    });

    abc.afterClosed().subscribe((x) => {
      console.log(x);
    });

   }
}
