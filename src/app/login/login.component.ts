import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }
email:string;
password:string;
  ngOnInit() {
  }
  doLogin()
  {
    if($(".invalid").length > 0){
      Materialize.toast('Invalid',1000);
    //  alert('Invalid');
    }else{
     // alert('Success');
     // Materialize.toast('Success',1000);
     window.localStorage.setItem('token','login');
     this.router.navigate(['support','issue-list']);
    }
  }

}
