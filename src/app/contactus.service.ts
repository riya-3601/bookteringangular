import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private _http:HttpClient) { }
  url:string='http://localhost:3000/contactus/';

  getContactus(){
    return this._http.get(this.url);
  }
  deleteContactus(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
}
