import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Cat } from "./category/cat";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string='http://localhost:3000/category/';
  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.url);
  }
  addCategory(obj:Cat){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteCategory(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getCategoryById(id:number){
    return this._http.get(this.url+id);
  }
  editCategory(obj:Cat){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url,body,{headers:head});
  }
}
