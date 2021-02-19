import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderdetailsService } from 'src/app/orderdetails.service';
import { AddressbookService } from "src/app/addressbook.service";
@Component({
  selector: 'app-addressbookpopup',
  templateUrl: './addressbookpopup.component.html',
  styleUrls: ['./addressbookpopup.component.css']
})
export class AddressbookpopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _address:AddressbookService) { }

  ngOnInit(): void {
    this._address.get(this.data).subscribe(
      (data:Orddet)=>{
        console.log(data);
      }
    );

  }

}
