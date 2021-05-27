import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';
import { Bfs } from "./bfs";
import { BookforsaleService } from "../bookforsale.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-bookforsale',
  templateUrl: './bookforsale.component.html',
  styleUrls: ['./bookforsale.component.css']
})
export class BookforsaleComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['book_isbn','book_title','book_author','book_status','book_price',
'book_publisher','book_ratings','book_image','category_name','action' ];
  obj:Bfs[]=[];
  dataSource: MatTableDataSource<Bfs>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _bfsdata:BookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this._bfsdata.getAllBookforsale().subscribe((data:Bfs[])=>{
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

  onDeleteClick(item: Bfs) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._bfsdata.deleteBookforsale(item.book_id).subscribe((data:any)=>{
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
onEditClick(item:Bfs){
  this._router.navigate(['/home/editbookforsale',item.book_id]);
  console.log(this.dataSource);
 }
 onAddClick():void{
  this._router.navigate(['/home/addbookforsale']);
 }
}
