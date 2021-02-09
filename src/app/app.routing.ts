import { Routes,RouterModule } from "@angular/router";
import { CategoryComponent } from './category/category.component';
import {  AddcategoryComponent} from "./category/addcategory/addcategory.component";
import { EditcategoryComponent } from './category/editcategory/editcategory.component';


const arr:Routes=[
  {path:'category',component:CategoryComponent},
  {path:'addcategory',component:AddcategoryComponent},
  {path:'editcategory/:category_id',component:EditcategoryComponent},
];
export const routingarr=RouterModule.forRoot(arr);
