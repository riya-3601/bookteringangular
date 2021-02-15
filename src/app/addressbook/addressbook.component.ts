import { Component, OnInit,AfterViewInit ,ViewChild} from '@angular/core';
import { Address } from "./address";
import { AddressbookService } from "../addressbook.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.css']
})
export class AddressbookComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] =['address_1','address_2','city','state','pincode','address_type','customer_name','action'];
  dataSource: MatTableDataSource<Address>;
  obj:Address[]=[];
  flag:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _addressdata:AddressbookService,private _router:Router,private _actRoute:ActivatedRoute) {
     this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {
    this._addressdata.getAllAddressbook().subscribe((data:Address[])=>{
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

  onDeleteClick(item: Address) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._addressdata.deleteAddressbook(item.address_id).subscribe((data:any)=>{
       console.log(data);
       if(data.affectedRows==1)
       {
         this.obj.splice(this.obj.indexOf((item),1));
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
onEditClick(item:Address){
 this._router.navigate(['/editaddressbook',item.address_id]);
 }
 onAddClick():void{
  this._router.navigate(['/addaddressbook']);
 }
}
