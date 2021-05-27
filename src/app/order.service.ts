import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Ord } from './order/ord';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string='http://localhost:3000/order/';
  url1:string='http://localhost:3000/editOrderDelivered/';
  url2:string='http://localhost:3000/myorders/';
  constructor(private _http:HttpClient) { }
  getAllOrders(){
    return this._http.get(this.url);
  }
  getAllOrdersAdmin(){
    return this._http.get(this.url2);
  }
  addorder(obj:Ord){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteOrder(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getOrderById(id:number){
    return this._http.get(this.url+id);
  }
  editOrder(obj:Ord){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url,body,{headers:head});
  }
  editOrderDelivered(id:number){
    //let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url1+id,{headers:head});
  }
}
