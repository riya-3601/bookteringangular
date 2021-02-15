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
      book_price:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_publisher:new FormControl(null,Validators.required),
      book_ratings:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      book_image:new FormControl(null,Validators.required),
      fk_category_id:new FormControl(null),
    });
  }
  onsignupClick():void{

    this._bfsdata.addBookforsale(this.bfsform.value).subscribe((data:any)=>{

      if(data.affectedRows==1)
       {
         alert('Data inserted succesfully');
         this._router.navigate(['/bookforsale']);
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
      this._router.navigate(['/bookforsale']);
    }
 }

}
