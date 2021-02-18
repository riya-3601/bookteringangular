import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import {BookreviewService  } from "src/app/bookreview.service";
import { Bookrev } from "src/app/bookreview/bookrev";



@Component({
  selector: 'app-bookforbarterpopup',
  templateUrl: './bookforbarterpopup.component.html',
  styleUrls: ['./bookforbarterpopup.component.css']
})
export class BookforbarterpopupComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['bookbarter_title','bookreview_description', 'bookreview_date','customer_name','customer_emailid','action'];
  dataSource: MatTableDataSource<Bookrev>;
  obj:Bookrev[]=[];
  bookreviewadd:FormGroup;
  flag: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogref: MatDialogRef<BookforbarterpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _bookrevdata:BookreviewService,private _router:Router) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this.bookreviewadd=new FormGroup({
      bookreview_id:new FormControl(null),
      bookreview_description:new FormControl(null),
      bookreview_date:new FormControl(null),
      fk_bookbarter_id:new FormControl(null),
      fk_customer_id:new FormControl(null),
      fk_category_id:new FormControl(null),
    });



    this._bookrevdata.getBookreviewByBookbarterId(this.data).subscribe((data:Bookrev[])=>{
    //   this.obj=data;
      this.dataSource.data=data;
    //   console.log(this.dataSource.data);
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
  onDeleteClick(item: Bookrev) {
    this._bookrevdata.deleteBookreview(item.bookreview_id).subscribe((data:any)=>{
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

onEditClick(item:Bookrev){
 this._router.navigate(['/home/editbookreview',item.bookreview_id]);
}
onAddBookrevClick(){
  this._router.navigate(['/home/addbookreview']);
}

}
