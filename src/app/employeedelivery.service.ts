import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Empdel } from "./employeedelivery/empdel";

@Injectable({
  providedIn: 'root'
})
export class EmployeedeliveryService {

  url:string='http://localhost:3000/employeedelivery/';
  constructor(private _http:HttpClient) { }

  getAllEmployeedelivery(){
    return this._http.get(this.url);
  }
  addEmployeedelivery(obj:Empdel){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteEmployeedelivery(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getEmployeedeliveryById(id:number){
    return this._http.get(this.url+id);
  }
  editEmployeedelivery(obj:Empdel)
{
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,body,{headers:head});
}

}
