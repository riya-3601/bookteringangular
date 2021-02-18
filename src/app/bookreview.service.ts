import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Bookrev } from "./bookreview/bookrev";

@Injectable({
  providedIn: 'root'
})
export class BookreviewService {
  url1:string="http://localhost:3000/bookreviewbybookbarterid/";
  url:string='http://localhost:3000/bookreview/';

  constructor(private _http:HttpClient) { }

  getAllBookreview(){
    return this._http.get(this.url);
  }
  addBookreview(obj:Bookrev){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteBookreview(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getBookreviewById(id:number){
    return this._http.get(this.url+id);
  }
  getBookreviewByBookbarterId(id:number){
    return this._http.get(this.url1+id);
  }
  editBookreview(obj:Bookrev)
{
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,body,{headers:head});
}

}
