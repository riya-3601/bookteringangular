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
  category_id:number;
  catform:FormGroup;
  selectedfile:File=null;
  constructor(private _actRoute:ActivatedRoute,private _editcat:CategoryService,private _router:Router) { }

  ngOnInit(): void {
    this.catform=new FormGroup({
      category_id:new FormControl(null),
      category_name:new FormControl(null,Validators.required),
      category_image:new FormControl(null,Validators.required),
      category_isactive:new FormControl(null),
    });
    this.category_id=this._actRoute.snapshot.params['category_id'];
    console.log(this.category_id);
    this._editcat.getCategoryById(this.category_id).subscribe((data:Cat[])=>{
      console.log(data);
      this.catform.patchValue({
        category_id:data[0].category_id,
        category_name:data[0].category_name,
        category_image:data[0].category_image,
        category_isactive:data[0].category_isactive
      });
    });
  }
  onEditCategory(){
    console.log(this.selectedfile);

    if(this.selectedfile==null || this.selectedfile==undefined ){

      let obj:Cat=new Cat(this.category_id,this.catform.get('category_name').value,'',this.catform.get('category_isactive').value);

    this._editcat.editCategorywithfile(obj).subscribe((data:any)=>{
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
    else{
    const fd=new FormData();
    fd.append('category_id',this.category_id+'');
    fd.append('category_name',this.catform.get('category_name').value);
    fd.append('category_image',this.selectedfile,this.selectedfile.name);
    fd.append('category_isactive',this.catform.get('category_isactive').value);
    console.log(fd);

    this._editcat.editCategory(fd).subscribe((data:any)=>{

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
  }
  onCancleClick(){
    this._router.navigate(['/home/category']);
  }
  imageFlag:boolean=true;
  onEditFile(value){
    this.selectedfile=<File>value.target.files[0];
    if(this.selectedfile.type=='image/png'|| this.selectedfile.type=='image/jpg'|| this.selectedfile.type=='image/jpeg'){
      this.imageFlag=true;
    }
    else{
      this.imageFlag=false;
      this.selectedfile=null;
    }
    console.log(this.selectedfile);
  }

}
