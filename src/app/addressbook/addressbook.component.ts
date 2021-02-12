import { Component, OnInit } from '@angular/core';
import { Address } from "./address";
import { AddressbookService } from "../addressbook.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.css']
})
export class AddressbookComponent implements OnInit {

  address_id:number;
  address_1:string;
  address_2:string;
  city:string;
  state:string;
  pincode:number;
  address_type:string;
  fk_customer_id:number;
  obj:Address[]=[];
  flag:boolean=false;
  constructor(private _addressdata:AddressbookService,private _router:Router,private _actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._addressdata.getAllAddressbook().subscribe((data:Address[])=>{
      this.obj=data;
    });
  }
  onDeleteClick(item: Address) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._addressdata.deleteAddressbook(item.address_id).subscribe((data:any)=>{
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
onEditClick(item:Address){
 // this._router.navigate(['/editaddressbook',item.address_id]);
 }
}
