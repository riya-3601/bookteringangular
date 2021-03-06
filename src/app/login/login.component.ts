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
 message:string='';
  hide:boolean=true;
  constructor(private _router:Router,private _logdata:LoginService) { }


  ngOnInit(): void {
    this.login=new FormGroup({
      login_username:new FormControl(null,[Validators.required,Validators.email]),
      login_password:new FormControl(null,[Validators.required])
      });

      }

  onsubmitClick(){
    // this.username=this.login.get('login_username').value;
    // this.password=this.login.get('login_password').value;
    // if(this.username=="Admin" || this.username=="admin" && this.password=="enter")
    // {
    //   this._router.navigate(['/home']);
    // }
    // else
    // {
    //   alert('Wrong Username or Password');
    // }
    this._logdata.getAdmin(this.login.value).subscribe((data:Cust[])=>{
      this.obj=data;
      console.log(this.obj);
      if(data.length==1){
        if(this.obj[0].customer_type==0){
          localStorage.setItem("username",this.obj[0].customer_emailid);
          localStorage.setItem('user_id',this.obj[0].customer_id+'');
          localStorage.setItem('user_naam',this.obj[0].customer_name);
          this._router.navigate(['/home']);
        }
        else{
          this.message='Username or Password is Wrong';
      }
      }
      else{
          this.message='Username or Password is Wrong';
      }
    });

  }

  onClearClick(){
    this.login.get('login_username').reset('');
  }

  // onloginClick(){

  //     this._router.navigate(['/home']);
  // }
}
