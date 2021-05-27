import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Bookbart } from "./bookforbarter/bookbart";

@Injectable({
  providedIn: 'root'
})
export class BookforbarterService {

  url:string='http://localhost:3000/bookforbarter/';
  constructor(private _http:HttpClient) { }

  getAllBookforbarter(){
    return this._http.get(this.url);
  }
  addBookforbarter(obj:FormData){
    return this._http.post(this.url,obj);
  }
  deleteBookforbarter(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getBookforbarterById(id:number){
    return this._http.get(this.url+id);
  }
  editBookforbarter(obj:FormData)
  {
  // let body=JSON.stringify(obj);
  // let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,obj);
  }
  editBookforbarterwithfile(obj:Bookbart){
    let  body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url+obj.bookbarter_id,obj,{headers:head});

  }

}


