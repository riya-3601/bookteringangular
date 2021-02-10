import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { Cust } from './customer/cust';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url:string='http://localhost:3000/customer/';
  constructor(private _http:HttpClient) { }
  getAllCustomer(){
    return this._http.get(this.url);
}
addCustomer(obj:Cust){
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.post(this.url,body,{headers:head});
}
deletecustomer(id:number){
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.delete(this.url+id,{headers:head});
}
getCustomerbyId(id:number){
  return this._http.get(this.url+id);
}
editCustomer(obj:Cust){
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,body,{headers:head});
}
}
