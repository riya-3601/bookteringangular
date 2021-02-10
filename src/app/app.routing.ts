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
  {path:'**',component:PagenotfoundComponent}

];
export const routingarr=RouterModule.forRoot(arr);
