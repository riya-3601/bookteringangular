import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderdetailsService } from 'src/app/orderdetails.service';
import { Orddet } from 'src/app/orderdetails/orddet';

@Component({
  selector: 'app-orderdetailspopup',
  templateUrl: './orderdetailspopup.component.html',
  styleUrls: ['./orderdetailspopup.component.css']
})
export class OrderdetailspopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private orddetail:OrderdetailsService) { }

  ngOnInit(): void {

      this.orddetail.getOrderdetailsByOrderId(this.data).subscribe(
        (data:Orddet)=>{
          console.log(data);
        }
      );


  }

}
