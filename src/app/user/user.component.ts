import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  constructor(
    private router:Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  mode: string = "ADD";
  id: number = 0;
  userCode: string;
  userName: string;
  userPassword: string;
  userFname: string;
  userLname: string;
  userType: number;
  ngOnInit() {
  }

  onSave(){
    let user = {

      userCode: this.userCode,
      userName: this.userName,
      userPassword: this.userPassword,
      userFname: this.userFname,
      userLname: this.userLname,
      userType: this.userType
    }

    let users: Array<any> = [];
    if (localStorage.getItem('user')) {
      users = JSON.parse(localStorage.getItem('user'));

    }
    if (this.mode == "EDIT") {
      users[this.id] = user;
      this.userService.updateItem(this.id, user).subscribe(
        data => {
          Materialize.toast('Update item complete', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        }
      )
     
    } else {
      
      this.userService.addItem(user).subscribe(
        datas => {
          Materialize.toast('Add new item complete', 1000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });



    }

  }
}
