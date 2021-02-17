import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string='http://localhost:3000/customer/';
  constructor(private _http:HttpClient) { }
  getAllCustomer(){
    return this._http.get(this.url);
}
}
