import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../model/Student';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(students: Student[], filterText: string){
    if(students.length === 0 || filterText === ""){
      return students;
    }else{
      return students.filter(function(Student){
        return Student.gender.toLowerCase() === filterText.toLowerCase();
      })
    }
  }

}
