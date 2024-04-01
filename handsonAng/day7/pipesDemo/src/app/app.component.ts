import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StudnetService } from './service/studnet.service';
// import { Student } from './model/Student.ts';
import { Student } from './model/Student';
import { PercentagePipe } from './pipes/percentage.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PercentagePipe, FormsModule, FilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private _serv: StudnetService) {}

  students: Student[];
  totalMarks: number;
  filterText: string='';

  ngOnInit(): void {
    this.students = this._serv.students;
    this.totalMarks = this._serv.totaMarks;
  }
}
