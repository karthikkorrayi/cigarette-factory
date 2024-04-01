import { Component } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './service/crud.service';
import { Student } from './model/Student';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule , ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularWithBackened';

  constructor(private serv: CrudService){}

  allStudents:Student[] = [];

  ngOnInit(): void{
    this.getStudentsData();
  }

  onSubmit(students: Student){
    console.log(students);

    this.serv.addStudent(students).subscribe({
      next: function(data){
        console.log(data);
      },
      error: (err) => {console.log("error");
      },
      complete:()=> {console.log("added");}
      
    }); 
    location.reload();
    
  }
  getStudentsData(){
    this.serv.getStudent().subscribe({
      next:(data) => {
        this.allStudents = data;
        console.log(this.allStudents);
      },
    });
  }

  
  
}
