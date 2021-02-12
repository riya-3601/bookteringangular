import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookforsaleService } from "src/app/bookforsale.service";
@Component({
  selector: 'app-addbookforsale',
  templateUrl: './addbookforsale.component.html',
  styleUrls: ['./addbookforsale.component.css']
})
export class AddbookforsaleComponent implements OnInit {
  bfsform:FormGroup;
  constructor(private _bfsdata:BookforsaleService) { }

  ngOnInit(): void {
    this.bfsform=new FormGroup({
      book_id:new FormControl(null),
      book_isbn:new FormControl(null),
      book_title : new FormControl(null),
      book_author:new FormControl(null),
      book_price:new FormControl(null),
      book_publisher:new FormControl(null),
      book_ratings:new FormControl(null),
      book_image:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
  }
  onsignupClick():void{

    this._bfsdata.addBookforsale(this.bfsform.value).subscribe((data:any)=>{

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
