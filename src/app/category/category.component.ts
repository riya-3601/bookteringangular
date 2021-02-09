import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Cat  } from "./cat";
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "../category.service";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category_id:number;
  category_name:string;
  category_isactive:string;
  obj:Cat[]=[];
  flag: boolean = false;
  constructor(private _catdata:CategoryService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._catdata.getAllCategory().subscribe((data:Cat[])=>{
      this.obj=data;
    });
  }
  onDeleteClick(item: Cat) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._catdata.deleteCategory(item.category_id).subscribe((data:any)=>{
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
   onEditClick(item:Cat){
     this._router.navigate(['/editcategory',item.category_id]);

   }
   onSaveClick(): void {
     this.obj.push(new Cat(this.category_id,this.category_name,this.category_isactive));
     this.flag = false;
   }

}
