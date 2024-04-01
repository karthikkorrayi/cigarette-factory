import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,AddUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'serviceDemo2';
  constructor(private _userServ: UserService){

  }

  users:{name:String, status: String}[];

  ngOnInit(): void{
    this.users = this._userServ.users;
  }
  
}
