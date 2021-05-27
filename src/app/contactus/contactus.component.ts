import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactusService } from '../contactus.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] =['contactus_name','contactus_emailid','contactus_message','customer_name','action'];
  obj:Contact[]=[];
  dataSource: MatTableDataSource<Contact>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _contdata:ContactusService) {
    this.dataSource = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  ngOnInit(): void {
    this._contdata.getContactus().subscribe((data:any)=>{
      this.obj=data;
      this.dataSource.data=data;
      console.log(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDeleteClick(row){
    this._contdata.deleteContactus(row.contactus_id).subscribe((data:any)=>{
      if(confirm('Response send?'))
      {
      if(data.affectedRows==1)
      {
        this.obj.splice(this.obj.indexOf(row),1);
        this.dataSource.data=this.obj;
        alert('Deleted successfully');
      }
      else
      {
        console.log(data);
        alert('Something went wrong');
      }
    }
    });
  }
}
