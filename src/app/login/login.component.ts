import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Cust } from '../customer/cust';
import { LoginService } from "../login.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  obj:Cust[];
  username:String;
  password:String;

  hide:boolean=true;
  constructor(private _router:Router,private _logdata:LoginService) { }


  ngOnInit(): void {
    this.login=new FormGroup({
      login_username:new FormControl(null,[Validators.required]),
      login_password:new FormControl(null,[Validators.required])
      });

      this._logdata.getAllCustomer().subscribe((data:Cust[])=>{
        this.obj=data;
      });
  }

  onsubmitClick(){
    this.username=this.login.get('login_username').value;
    this.password=this.login.get('login_password').value;
    if(this.username=="Admin" || this.username=="admin" && this.password=="enter")
    {
      this._router.navigate(['/home']);
    }
    else
    {
      alert('Wrong Username or Password');
    }
  }

  onClearClick(){
    this.login.get('login_username').reset('');
  }

  // onloginClick(){

  //     this._router.navigate(['/home']);
  // }
}
