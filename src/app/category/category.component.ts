import { Component, OnInit ,AfterViewInit,ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { Cat  } from "./cat";
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "../category.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] =['category_name','category_isactive','action'];
  obj:Cat[]=[];
  dataSource: MatTableDataSource<Cat>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _catdata:CategoryService,private _router:Router,private _actRoute:ActivatedRoute) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
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
  onDeleteClick(item: Cat) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._catdata.deleteCategory(item.category_id).subscribe((data:any)=>{
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
   onEditClick(item:Cat){
     this._router.navigate(['/home/editcategory',item.category_id]);

   }
   onAddClick():void{
    this._router.navigate(['/home/addcategory']);
   }

}
