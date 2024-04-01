import { Component } from '@angular/core';
import { title } from 'node:process';

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.css'
})
export class AngularComponent {

  title ='angular'
  enroll(){
    
  }

}
