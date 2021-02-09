import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  catform:FormGroup;
  constructor(private _catdata:CategoryService) { }

  ngOnInit(): void {
    this.catform=new FormGroup({
      category_id:new FormControl(null),
      category_name:new FormControl(null),
      category_isactive:new FormControl(null),
    });
  }
  onsignupClick():void{
    alert('into signupClick');

    this._catdata.addCategory(this.catform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');
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

}
