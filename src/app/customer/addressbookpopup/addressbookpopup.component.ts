import { AfterViewInit, Component, Inject, OnInit, ViewChild  } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { AddressbookService } from "src/app/addressbook.service";
import { Address } from "src/app/addressbook/address";
import { FormGroup,FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";

@Component({
  selector: 'app-addressbookpopup',
  templateUrl: './addressbookpopup.component.html',
  styleUrls: ['./addressbookpopup.component.css']
})
export class AddressbookpopupComponent implements OnInit,AfterViewInit {
  displayedColumns: string[]=['address_1','address_2','city','state','pincode','address_type','action'];
  dataSource: MatTableDataSource<Address>;
  addressform:FormGroup;
  obj:Address[]=[];
  flag:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogref: MatDialogRef<AddressbookpopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _addressdata:AddressbookService,private _router:Router,) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {

    this.addressform=new FormGroup({
      address_id:new FormControl(null),
      address_1:new FormControl(null),
      address_2:new FormControl(null),
      city:new FormControl(null),
      state:new FormControl(null),
      pincode:new FormControl(null),
      address_type:new FormControl(null),
    });

    this._addressdata.getAddressbyCustomerid(this.data).subscribe((data:Address[])=>{
        this.dataSource.data=data;
        console.log(data);
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
 this._router.navigate(['/home/editaddressbook',item.address_id]);
 }
 onAddClick():void{
  this._router.navigate(['/home/addaddressbook']);
 }

}
