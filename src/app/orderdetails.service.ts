import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Orddet } from "./orderdetails/orddet";

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  url:string='http://localhost:3000/orderdetails/';
  constructor(private _http:HttpClient) { }


  getAllOrderdetails(){
    return this._http.get(this.url);
  }
  addOrderdetails(obj:Orddet){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteOrderdetails(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getOrderdetailsById(id:number){
    return this._http.get(this.url+id);
  }
  editOrderdetails(obj:Orddet)
{
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,body,{headers:head});
}
}
