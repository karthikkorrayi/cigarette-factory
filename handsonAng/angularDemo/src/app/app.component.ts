import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularDemo';
  flag = 'kk'


  employees=[
    {
      empId:1,
      empName:'ishani',
      empCity: 'kolkata',
    },
    {
      empId:2,
      empName:'snehal',
      empCity: 'pune',
    },
    {
      empId:3,
      empName:'joyesh',
      empCity: 'haldia',
    },
    {
      empId:4,
      empName:'ayush',
      empCity: 'lucknow',
    },
    
  ]
}
