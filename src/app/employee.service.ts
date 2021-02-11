import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Emp } from "./employee/emp";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url:string='http://localhost:3000/employee/';
  constructor(private _http:HttpClient) { }

  getAllEmployee(){
    return this._http.get(this.url);
  }
  addEmployee(obj:Emp){
    let body=JSON.stringify(obj);
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.post(this.url,body,{headers:head});
  }
  deleteEmployee(id:number){
    let head=new HttpHeaders().set(environment.headname,environment.headvalue);
    return this._http.delete(this.url+id,{headers:head});
  }
  getEmployeeById(id:number){
    return this._http.get(this.url+id);
  }
  editEmployee(obj:Emp)
{
  let body=JSON.stringify(obj);
  let head=new HttpHeaders().set(environment.headname,environment.headvalue);
  return this._http.put(this.url,body,{headers:head});
}

}
