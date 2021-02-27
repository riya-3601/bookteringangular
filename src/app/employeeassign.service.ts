import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Ord } from './order/ord';
import { Empass } from './employeeassign/empass';

@Injectable({
  providedIn: 'root'
})
export class EmployeeassignService {

  url:string='http://localhost:3000/employeeassign/';
  constructor(private _http:HttpClient) { }
  getAllOrders(){
    return this._http.get(this.url);
  }
  addempDelivery(data:Empass){
    let body=JSON.stringify(data);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
}
