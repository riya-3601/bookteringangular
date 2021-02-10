import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Ord } from './order/ord';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string='http://localhost:3000/order/';
  constructor(private _http:HttpClient) { }
  getAllOrders(){
    return this._http.get(this.url);

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

}
