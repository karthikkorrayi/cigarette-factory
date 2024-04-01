import { Injectable } from '@angular/core';
import { Student } from '../model/Student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }
  addStudent(val: Student){
    return this.http.post("http://localhost:8090/student/addStudent",val);
  }

  getStudent(){
    return this.http.get<Student[]>("http://localhost:8090/student/getStudents");
  }
}
