import { Routes,RouterModule } from "@angular/router";
import { CategoryComponent } from './category/category.component';
import {  AddcategoryComponent} from "./category/addcategory/addcategory.component";
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { BookforbarterComponent } from "./bookforbarter/bookforbarter.component";
import { AddbookforbarterComponent } from "./bookforbarter/addbookforbarter/addbookforbarter.component";
import { EditbookforbarterComponent } from "./bookforbarter/editbookforbarter/editbookforbarter.component";
import { EmployeedeliveryComponent } from "./employeedelivery/employeedelivery.component";
import { AddemployeedeliveryComponent } from "./employeedelivery/addemployeedelivery/addemployeedelivery.component";
import { EditemployeedeliveryComponent } from "./employeedelivery/editemployeedelivery/editemployeedelivery.component";
import { BookreviewComponent } from "./bookreview/bookreview.component";
import { AddbookreviewComponent } from "./bookreview/addbookreview/addbookreview.component";
import { EditbookreviewComponent } from "./bookreview/editbookreview/editbookreview.component";

const arr:Routes=[
  {path:'category',component:CategoryComponent},
  {path:'addcategory',component:AddcategoryComponent},
  {path:'editcategory/:category_id',component:EditcategoryComponent},
  {path:'bookforbarter',component:BookforbarterComponent},
  {path:'addbookforbarter',component:AddbookforbarterComponent},
  {path:'editbookforbarter/:bookbarter_id',component:EditbookforbarterComponent},
  {path:'bookreview',component:BookreviewComponent},
  {path:'addbookreview',component:AddbookreviewComponent},
  {path:'editbookreview/:bookreview_id',component:EditbookreviewComponent},
   {path:'employeedelivery',component:EmployeedeliveryComponent},
  {path:'addemployeedelivery',component:AddemployeedeliveryComponent},
  {path:'editemployeedelivery/:delivery_id',component:EditemployeedeliveryComponent},
];
export const routingarr=RouterModule.forRoot(arr);
