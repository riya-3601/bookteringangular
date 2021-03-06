import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  onLogoutClick(){
    if(confirm("Are you sure you want to logout?")){
      localStorage.removeItem("username");
      this._router.navigate(['/']);
    }
  }
}
