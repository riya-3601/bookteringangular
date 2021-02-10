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

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    BookforbarterComponent,
    AddbookforbarterComponent,
    EditbookforbarterComponent ,
    HeaderComponent,
    EmployeedeliveryComponent,
    AddemployeedeliveryComponent,
    EditemployeedeliveryComponent,
    BookreviewComponent,
    AddbookreviewComponent,
    EditbookreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routingarr,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }