import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Cat } from '../cat';
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  category_id:number=1;
  catform:FormGroup;
  constructor(private _actRoute:ActivatedRoute,private _editcat:CategoryService,private _router:Router) { }

  ngOnInit(): void {
    this.catform=new FormGroup({
      category_id:new FormControl(null),
      category_name:new FormControl(null,Validators.required),
      category_isactive:new FormControl(null),
    });
    this.category_id=this._actRoute.snapshot.params['category_id'];
    console.log(this.category_id);
    this._editcat.getCategoryById(this.category_id).subscribe((data:Cat[])=>{
      console.log(data);
      this.catform.patchValue({
        category_id:data[0].category_id,
        category_name:data[0].category_name,
        category_isactive:data[0].category_isactive
      });
    });
  }
  onEditCategory(){
    this._editcat.editCategory(this.catform.value).subscribe((data:any)=>{
      if(data.affectedRows==1)
       {
         alert('Data updated succesfully');
        this._router.navigate(['/home/category']);

       }
       else{
         alert('Something went wrong');
         console.log(data);
       }
     },
     function(err){
       console.log(err);

    });
  }
  onCancleClick(){
    this._router.navigate(['/home/category']);
  }

}
