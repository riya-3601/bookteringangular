import { Component, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions , ChartType} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { OrderService } from "../order.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderdetailspopupComponent } from 'src/app/order/orderdetailspopup/orderdetailspopup.component';
import { Ord } from '../order/ord';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,55,90,35,20,30], label: 'Book for Sale' },
    {data:[45,60,30,25,65,80,55,70,20,30,46,50],label:'Book for Barter'},
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  displayedColumns: string[] = ['order_date', 'order_status', 'order_paymenttype', 'order_totalamount','customer_name','action','details'];
  dataSource: MatTableDataSource<Ord>;
  orderaccrej:string[]=['Accept','Reject'];
  obj:Ord[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _orddata:OrderService,private _router:Router,private _actRoute:ActivatedRoute,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this._orddata.getAllOrders().subscribe((data:Ord[])=>{
      this.obj=data;
      this.dataSource.data=data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDeleteClick(item: Ord) {
    if(confirm("Are you sure you want to delete?"))
    {
     this._orddata.deleteOrder(item.order_id).subscribe((data:any)=>{
       console.log(data);
       if(data.affectedRows==1)
       {
         this.obj.splice(this.obj.indexOf(item),1);
          this.dataSource.data=this.obj;
         alert('Deleted Successfully');
       }
       else{
         alert('Something went wrong');
         console.log(data);
       }
     });
   }
}
onEditClick(item:Ord){
  this._router.navigate(['/home/editorder',item.order_id]);
 }
 onAddClick():void{
  this._router.navigate(['/home/addorder']);
 }
 onDetailsClick(item:Ord){
  console.log(item.order_id);
  const abc =this.dialog.open(OrderdetailspopupComponent, {
    data:item.order_id
  });

  abc.afterClosed().subscribe((x) => {
    console.log(x);
  });

 }
}
