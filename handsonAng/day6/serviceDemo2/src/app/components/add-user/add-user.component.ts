import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  username: string = ""
  status: string = ""


  constructor(private _serv:UserService){

  }

  addUser(){
    this._serv.addNewUser(this.username, this.status)
  }

}
