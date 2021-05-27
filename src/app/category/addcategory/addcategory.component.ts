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
  selectedfile:File=null;
  constructor(private _catdata:CategoryService,private _router:Router) { }
  appliction:any;
  ngOnInit(): void {
    this.catform=new FormGroup({
      category_id:new FormControl(null),
      category_name:new FormControl(null,Validators.required),
      category_image:new FormControl(null,Validators.required),
      category_isactive:new FormControl(null,Validators.required),
    });
  }
  onsignupClick():void{

    const fd=new FormData();
    fd.append('category_id',this.catform.get('category_id').value);
    fd.append('category_name',this.catform.get('category_name').value);
    fd.append('category_image',this.selectedfile,this.selectedfile.name);
    fd.append('category_isactive',this.catform.get('category_isactive').value);


    console.log(fd);


    this._catdata.addCategory(fd).subscribe((data:any)=>{

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
    if(confirm("Are you sure you want to Cancel?"))
    {
      this._router.navigate(['/home/category']);
    }
 }
 imageFlag:boolean=true;
 onFileAdd(value){
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
