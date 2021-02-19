import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { BookforbarterpopupComponent } from "./bookforbarterpopup/bookforbarterpopup.component";
import { BookforbarterService } from "../bookforbarter.service";
import { Bookbart } from "./bookbart";


@Component({
  selector: 'app-bookforbarter',
  templateUrl: './bookforbarter.component.html',
  styleUrls: ['./bookforbarter.component.css']
})
export class BookforbarterComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = ['bookbarter_title', 'bookbarter_author','bookbarter_status', 'bookbarter_price','customer_name','action','reviews'];
  dataSource: MatTableDataSource<Bookbart>;
  obj:Bookbart[]=[];
  bookforbarteradd:FormGroup;
  flag: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _bookbartdata:BookforbarterService,private _router:Router,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  ngOnInit(): void {
    this.bookforbarteradd=new FormGroup({
      bookbarter_id:new FormControl(null),
      bookbarter_title:new FormControl(null),
      bookbarter_author:new FormControl(null),
      bookbarter_status:new FormControl(null),
      bookbarter_price:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });



    this._bookbartdata.getAllBookforbarter().subscribe((data:Bookbart[])=>{
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
  onDeleteClick(item: Bookbart) {
    this._bookbartdata.deleteBookforbarter(item.bookbarter_id).subscribe((data:any)=>{
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
openDialog(item:Bookbart) {
  const abc = this.dialog.open(BookforbarterpopupComponent, {
    data:item.bookbarter_id
  });


  abc.afterClosed().subscribe((x) => {
    console.log(x);
  });
}

onEditClick(item:Bookbart){
 this._router.navigate(['/home/editbookforbarter',item.bookbarter_id]);
}
onAddBookbartClick(){
  this._router.navigate(['/home/addbookforbarter']);
}

}
