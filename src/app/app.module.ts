import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { routingarr } from "./app.routing";
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { AddbookforbarterComponent } from "./bookforbarter/addbookforbarter/addbookforbarter.component";
import { EditbookforbarterComponent } from "./bookforbarter/editbookforbarter/editbookforbarter.component";
import { HeaderComponent } from './header/header.component';
import { EmployeedeliveryComponent } from './employeedelivery/employeedelivery.component';
import { AddemployeedeliveryComponent } from './employeedelivery/addemployeedelivery/addemployeedelivery.component';
import { EditemployeedeliveryComponent } from './employeedelivery/editemployeedelivery/editemployeedelivery.component';
import { BookreviewComponent } from './bookreview/bookreview.component';
import { AddbookreviewComponent } from './bookreview/addbookreview/addbookreview.component';
import { EditbookreviewComponent } from './bookreview/editbookreview/editbookreview.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CustomerComponent } from './customer/customer.component';
import { AddcustomerComponent } from './customer/addcustomer/addcustomer.component';
import { EditcustomerComponent } from './customer/editcustomer/editcustomer.component';
import { OrderComponent } from './order/order.component';
import { AddorderComponent } from './order/addorder/addorder.component';
import { EditorderComponent } from './order/editorder/editorder.component';
import { AddressbookComponent } from './addressbook/addressbook.component';
import { AddaddressbookComponent } from './addressbook/addaddressbook/addaddressbook.component';
import { EditaddressbookComponent } from './addressbook/editaddressbook/editaddressbook.component';
import { BookforsaleComponent } from './bookforsale/bookforsale.component';
import { AddbookforsaleComponent } from './bookforsale/addbookforsale/addbookforsale.component';
import { EditbookforsaleComponent } from './bookforsale/editbookforsale/editbookforsale.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
//import { MatAccordion,MatExpansionModule } from "@angular/material/expansion";


import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { EditemployeeComponent } from './employee/editemployee/editemployee.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AddorderdetailsComponent } from './orderdetails/addorderdetails/addorderdetails.component';
import { EditorderdetailsComponent } from './orderdetails/editorderdetails/editorderdetails.component';
import { DemoComponent } from './demo/demo.component';
import { MatCardModule } from '@angular/material/card';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell/shell.component';
import { BookforbarterpopupComponent } from './bookforbarter/bookforbarterpopup/bookforbarterpopup.component';
import { OrderdetailspopupComponent } from './order/orderdetailspopup/orderdetailspopup.component';
import { AddressbookpopupComponent } from './customer/addressbookpopup/addressbookpopup.component';
import { EmployeepopupComponent } from './employee/employeepopup/employeepopup.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    HeaderComponent,
    WelcomeComponent,
    PagenotfoundComponent,
    CustomerComponent,
    AddcustomerComponent,
    EditcustomerComponent,
    OrderComponent,
    AddorderComponent,
    EditorderComponent,
    BookforbarterComponent,
    AddbookforbarterComponent,
    EditbookforbarterComponent ,
    HeaderComponent,
    EmployeedeliveryComponent,
    AddemployeedeliveryComponent,
    EditemployeedeliveryComponent,
    BookreviewComponent,
    AddbookreviewComponent,
    EditbookreviewComponent,
    AddressbookComponent,
    AddaddressbookComponent,
    EditaddressbookComponent,
    BookforsaleComponent,
    AddbookforsaleComponent,
    EditbookforsaleComponent,
    EmployeeComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    OrderdetailsComponent,
    AddorderdetailsComponent,
    EditorderdetailsComponent,
    DemoComponent,
    AdminhomeComponent,
    LoginComponent,
    ShellComponent,
    BookforbarterpopupComponent,
    OrderdetailspopupComponent,
<<<<<<< HEAD
    AddressbookpopupComponent
=======
    EmployeepopupComponent
>>>>>>> 33b53589c939f48a66e55d1447839d8a6b82b97e

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routingarr,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
