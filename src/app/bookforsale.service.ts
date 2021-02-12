import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Bfs } from "./bookforsale/bfs";
@Injectable({
  providedIn: 'root'
})
export class BookforsaleService {
  url:string='http://localhost:3000/bookforsale/';
  constructor(private _http:HttpClient) { }
  getAllBookforsale(){
    return this._http.get(this.url);
  }
  addBookforsale(obj:Bfs){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteBookforsale(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getBookforsaleById(id:number){
    return this._http.get(this.url+id);
  }
  editBookforsale(obj:Bfs){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.put(this.url,body,{headers:head});
  }
}
