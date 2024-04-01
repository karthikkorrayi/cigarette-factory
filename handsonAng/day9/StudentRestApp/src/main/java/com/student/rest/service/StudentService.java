package com.student.rest.service;

import java.util.List;

import com.student.rest.exception.StudentDoesNotExistException;
import com.student.rest.exception.StudentExistsAlreadyException;
import com.student.rest.model.Student;

public interface StudentService {
	
	Student addStudent(Student s) throws StudentExistsAlreadyException;
	Student findStudentById(int sid);
	List<Student> getAllStudents();
	boolean deleteStudent(int sid);
	Student updateStudent(Student std);
	List<Student> findStudentsByAddress(String studentAddress) throws StudentDoesNotExistException;
	
	

}
