import { Component, OnInit } from '@angular/core';
import { Bfs } from "./bfs";
import { BookforsaleService } from "../bookforsale.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bookforsale',
  templateUrl: './bookforsale.component.html',
  styleUrls: ['./bookforsale.component.css']
})
export class BookforsaleComponent implements OnInit {
  book_id:number;
  book_isbn:number;
  book_title : string;
  book_author:string;
  book_price:number;
  book_publisher:string;
  book_ratings:number;
  book_image:string;
  fk_customer_id:number;
  obj:Bfs[]=[];
  flag: boolean = false;
  constructor(private _bfsdata:BookforsaleService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._bfsdata.getAllBookforsale().subscribe((data:Bfs[])=>{
      this.obj=data;
    });
  }
  onDeleteClick(item: Bfs) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._bfsdata.deleteBookforsale(item.book_id).subscribe((data:any)=>{
       console.log(data);
       if(data.affectedRows==1)
       {
         this.obj.splice(this.obj.indexOf((item),1));
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
  this._router.navigate(['/editorder',item.book_id]);
 }
}
