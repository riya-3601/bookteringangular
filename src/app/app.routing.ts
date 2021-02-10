import { Routes,RouterModule } from "@angular/router";
import { CategoryComponent } from './category/category.component';
import {  AddcategoryComponent} from "./category/addcategory/addcategory.component";
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { CustomerComponent } from "./customer/customer.component";
import { AddcustomerComponent} from "./customer/addcustomer/addcustomer.component";
import { EditcustomerComponent } from "./customer/editcustomer/editcustomer.component";
import { OrderComponent } from "./order/order.component";
import { AddorderComponent } from "./order/addorder/addorder.component";
import { EditorderComponent } from "./order/editorder/editorder.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
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
  {path:'welcome',component:WelcomeComponent},
  {path:'category',component:CategoryComponent},
  {path:'addcategory',component:AddcategoryComponent},
  {path:'editcategory/:category_id',component:EditcategoryComponent},
  {path:'customer',component:CustomerComponent},
  {path:'addcustomer',component:AddcustomerComponent},
  {path:'editcustomer/:customer_id',component:EditcustomerComponent},
  {path:'order',component:OrderComponent},
  {path:'addorder',component:AddorderComponent},
  {path:'editorder/:order_id',component:EditorderComponent},
  {path:'bookforbarter',component:BookforbarterComponent},
  {path:'addbookforbarter',component:AddbookforbarterComponent},
  {path:'editbookforbarter/:bookbarter_id',component:EditbookforbarterComponent},
  {path:'bookreview',component:BookreviewComponent},
  {path:'addbookreview',component:AddbookreviewComponent},
  {path:'editbookreview/:bookreview_id',component:EditbookreviewComponent},
   {path:'employeedelivery',component:EmployeedeliveryComponent},
  {path:'addemployeedelivery',component:AddemployeedeliveryComponent},
  {path:'editemployeedelivery/:delivery_id',component:EditemployeedeliveryComponent},
  {path:'**',component:PagenotfoundComponent}
];
export const routingarr=RouterModule.forRoot(arr);
