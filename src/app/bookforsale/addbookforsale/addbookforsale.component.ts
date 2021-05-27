import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { BookforsaleService } from "src/app/bookforsale.service";
import { CategoryService } from "src/app/category.service";
import { Cat } from "src/app/category/cat";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addbookforsale',
  templateUrl: './addbookforsale.component.html',
  styleUrls: ['./addbookforsale.component.css']
})
export class AddbookforsaleComponent implements OnInit {
  bfsform:FormGroup;
  cat:Cat[]=[];
  applicant: any;
  selectedfile:File=null;
  constructor(private _bfsdata:BookforsaleService,private _catdata:CategoryService,private _router:Router) { }

  ngOnInit(): void {

    this._catdata.getAllCategory().subscribe(
      (data:Cat[])=>{
        this.cat=data;
      }
    );

    this.bfsform=new FormGroup({
      book_id:new FormControl(null),
      book_isbn:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_title : new FormControl(null,Validators.required),
      book_author:new FormControl(null,Validators.required),
      book_description:new FormControl(null,[Validators.required,Validators.maxLength(400)]),
      book_status:new FormControl(null,[Validators.required]),
      book_price:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_publisher:new FormControl(null,Validators.required),
      book_ratings:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_image:new FormControl(null,Validators.required),
      fk_category_id:new FormControl(null),
    });
  }

  onsignupClick():void{
    if(this.imageFlag){
    const fd=new FormData();
    fd.append('book_isbn',this.bfsform.get('book_isbn').value);
    fd.append('book_title',this.bfsform.get('book_title').value);
    fd.append('book_author',this.bfsform.get('book_author').value);
    fd.append('book_description',this.bfsform.get('book_description').value);
    fd.append('book_status',this.bfsform.get('book_status').value);
    fd.append('book_price',this.bfsform.get('book_price').value);
    fd.append('book_publisher',this.bfsform.get('book_publisher').value);
    fd.append('book_ratings',this.bfsform.get('book_ratings').value);
    fd.append('book_image',this.selectedfile,this.selectedfile.name);
    fd.append('fk_category_id',this.bfsform.get('fk_category_id').value);
    console.log(fd);

    this._bfsdata.addBookforsale(fd).subscribe((data:any)=>{
      console.log(data);
      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');

         this._router.navigate(['/home/bookforsale']);
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
  onCancleClick():void{
    if(confirm("Are you sure you want to Cancle?"))
    {
      this._router.navigate(['/home/bookforsale']);
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
