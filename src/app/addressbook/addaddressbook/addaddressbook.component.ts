import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddressbookService } from "src/app/addressbook.service";
@Component({
  selector: 'app-addaddressbook',
  templateUrl: './addaddressbook.component.html',
  styleUrls: ['./addaddressbook.component.css']
})
export class AddaddressbookComponent implements OnInit {
  addressform:FormGroup;
  constructor(private _addressdata:AddressbookService) { }

  ngOnInit(): void {
    this.addressform=new FormGroup({
      address_id:new FormControl(null),
      address_1:new FormControl(null),
      address_2:new FormControl(null),
      city:new FormControl(null),
      state:new FormControl(null),
      pincode:new FormControl(null),
      address_type:new FormControl(null),
      fk_customer_id:new FormControl(null),
    });
  }
  onsignupClick():void{

    this._addressdata.addAddressbook(this.addressform.value).subscribe((data:any)=>{

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
