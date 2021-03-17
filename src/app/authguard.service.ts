import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(private _routdata:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(localStorage.getItem("username"));
    if(localStorage.getItem("username")!='' && localStorage.getItem("username")!=null){
      console.log('from authguard');
      return true;
    }
   this._routdata.navigate(['/']);
   return false;
  }
}
