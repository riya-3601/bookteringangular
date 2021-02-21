import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Ord } from './order/ord';

@Injectable({
  providedIn: 'root'
})
export class EmployeeassignService {

  url:string='http://localhost:3000/employeeassign/';
  constructor(private _http:HttpClient) { }
  getAllOrders(){
    return this._http.get(this.url);
  }
}
