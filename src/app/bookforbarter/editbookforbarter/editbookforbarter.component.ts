import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BookforbarterService } from "src/app/bookforbarter.service";
import { CustomerService } from 'src/app/customer.service';
import { Cust } from 'src/app/customer/cust';
import { Bookbart } from '../bookbart';

@Component({
  selector: 'app-editbookforbarter',
  templateUrl: './editbookforbarter.component.html',
  styleUrls: ['./editbookforbarter.component.css']
})
export class EditbookforbarterComponent implements OnInit {

  constructor(private _editbookbart: BookforbarterService, private _actRoute: ActivatedRoute, private _router: Router, private _custdata: CustomerService) { }
  cust: Cust[] = [];
  bookforbarteradd: FormGroup;
  flag: boolean = false;
  selectedfile: File =null;
  bookbarter_id;
  ngOnInit(): void {
    this.bookforbarteradd = new FormGroup({
      bookbarter_id: new FormControl(null, [Validators.required]),
      bookbarter_title: new FormControl(null, [Validators.required]),
      bookbarter_author: new FormControl(null, [Validators.required]),
      bookbarter_description: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      bookbarter_status: new FormControl(null, [Validators.required]),
      bookbarter_price: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      bookbarter_image: new FormControl(null),
      fk_customer_id: new FormControl(null, [Validators.required]),
    });

    this._custdata.getAllCustomer().subscribe((data: Cust[]) => {
      this.cust = data;
    });

    this.bookbarter_id = this._actRoute.snapshot.params['bookbarter_id'];
    console.log(this.bookbarter_id);
    this._editbookbart.getBookforbarterById(this.bookbarter_id).subscribe((data: any) => {
      console.log(data);
      this.bookforbarteradd.patchValue({
        bookbarter_id: data[0].bookbarter_id,
        bookbarter_title: data[0].bookbarter_title,
        bookbarter_author: data[0].bookbarter_author,
        bookbarter_description: data[0].bookbarter_description,
        bookbarter_status: data[0].bookbarter_status,
        bookbarter_price: data[0].bookbarter_price,
        bookbarter_image: data[0].bookbarter_image,
        fk_customer_id: data[0].fk_customer_id
      });
    });
  }

  onEditClick() {
    if(this.imageFlag){
    console.log(this.selectedfile);

    if(this.selectedfile==null || this.selectedfile==undefined ){

      let obj:Bookbart=new Bookbart(this.bookbarter_id,this.bookforbarteradd.get('bookbarter_title').value,this.bookforbarteradd.get('bookbarter_author').value,this.bookforbarteradd.get('bookbarter_description').value,this.bookforbarteradd.get('bookbarter_status').value,this.bookforbarteradd.get('bookbarter_price').value,'',this.bookforbarteradd.get('fk_customer_id').value)

    this._editbookbart.editBookforbarterwithfile(obj).subscribe((data:any)=>{
      if(data.affectedRows==1)
       {
         alert('Data updated succesfully');
        this._router.navigate(['/home/bookforbarter']);

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
  else
  {
    const fd = new FormData();
    fd.append('bookbarter_id',this.bookbarter_id+'');
    fd.append('bookbarter_title', this.bookforbarteradd.get('bookbarter_title').value);
    fd.append('bookbarter_author', this.bookforbarteradd.get('bookbarter_author').value);
    fd.append('bookbarter_description', this.bookforbarteradd.get('bookbarter_description').value);
    fd.append('bookbarter_status', this.bookforbarteradd.get('bookbarter_status').value);
    fd.append('bookbarter_price', this.bookforbarteradd.get('bookbarter_price').value);
    fd.append('bookbarter_image', this.selectedfile, this.selectedfile.name);
    fd.append('fk_customer_id', this.bookforbarteradd.get('fk_customer_id').value);


    this._editbookbart.editBookforbarter(fd).subscribe((data: any) => {
      if (data.affectedRows == 1) {
        // this.obj.push(this.bookforbarteradd.value);
        alert('Row updated successfully');
        this._router.navigate(['/home/bookforbarter']);
      }
      else {
        alert('Something went wrong');
        console.log(data);
      }
    }, function (err) {
      console.log(err);
    });
  }
}
}
  onCancelClick(): void {
    if (confirm('Are you sure you want to cancel?')) {
      this._router.navigate(['/home/bookforbarter']);
    }
  }
  onClearClick() {
    this.bookforbarteradd.get('bookbarter_title').reset('');
  }
  onClearPriceClick() {
    this.bookforbarteradd.get('bookbarter_price').reset('');
  }
  onClearAuthorClick() {
    this.bookforbarteradd.get('bookbarter_author').reset('');
  }
  onClearDescClick() {
    this.bookforbarteradd.get('bookbarter_description').reset('');
  }
  imageFlag:boolean=true;
  onFileAdd(value) {
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
