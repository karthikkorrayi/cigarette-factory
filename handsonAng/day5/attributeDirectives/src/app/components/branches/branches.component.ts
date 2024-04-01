import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent {
  branches =[
    {
      id: 1,
      name: 'itc gardenia',
      city: 'benguluru',
      image: '/assets/rich.jpeg',
      availability: 'available'
    },
    {
      id: 2,
      name: 'itc kohinoor',
      city: 'hyderabad',
      image: '/assets/kohi.jpeg',
      availability: 'not-available'
    },
    {
      id: 3,
      name: 'itc maratha',
      city: 'mumbai',
      image: '/assets/mara.jpeg',
      availability: 'available'
    }
  ]

}
