import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { JwtService } from './service/jwt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.getAccessToken(this.credentials);
  }

  constructor(private jwtserv: JwtService) {}
  credentials: any = {
    username: 'kk',
    password: 'kk142',
  };

  getAccessToken(credentials) {
    this.jwtserv.generateToken(credentials).subscribe({
      next: (val) => {
        console.log('Token :' + val);
        // localStorage.setItem('token', val.toString());
        this.jwtserv
          .welcome(val)
          .subscribe({ next: (val) => console.log(val) });
      },
    });
  }




}
