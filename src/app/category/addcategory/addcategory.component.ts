import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  catform:FormGroup;
  constructor(private _catdata:CategoryService,private _router:Router) { }
  appliction:any;
  ngOnInit(): void {
    this.catform=new FormGroup({
      category_id:new FormControl(null),
      category_name:new FormControl(null,Validators.required),
      category_isactive:new FormControl(null,Validators.required),
    });
  }
  onsignupClick():void{


    this._catdata.addCategory(this.catform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');
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
  onCancleClick():void{
    if(confirm("Are you sure you want to Cancle?"))
    {
      this._router.navigate(['/home/category']);
    }
 }
}
