import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  users=[
    { name: 'ayush', status: 'active'},
    { name: 'ishani', status: 'inactive'},
    { name: 'joyesh', status: 'inactive'},
    { name: 'snehal', status: 'active'},
  ];

  addNewUser(name: string, status:string){
    this.users.push({name: name, status: status});
  }
}
