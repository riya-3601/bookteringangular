import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Address } from "./addressbook/address";
@Injectable({
  providedIn: 'root'
})
export class AddressbookService {
  url:string='http://localhost:3000/addressbook/';
  constructor(private _http:HttpClient) { }
  getAllAddressbook(){
    return this._http.get(this.url);
  }
  addAddressbook(obj:Address){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteAddressbook(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getAddressbookById(id:number){
    return this._http.get(this.url+id);
  }
  editAddressbook(obj:Address){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url,body,{headers:head});
  }
}
