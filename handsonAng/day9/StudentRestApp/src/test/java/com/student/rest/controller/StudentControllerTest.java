package com.student.rest.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.student.rest.exception.StudentExistsAlreadyException;
import com.student.rest.model.Student;
import com.student.rest.service.StudentService;

@SpringBootTest()
class StudentControllerTest {

	@Mock
	StudentService service;
	
	@InjectMocks
	StudentController controller;
	
	@Test
	public void getAllStudentsTest()
	{
		List<Student> studentList = new ArrayList<Student>();
		
		studentList.add(new Student(67, "sam", "blr", 23, "sam@gmail.com"));
		studentList.add(new Student(45, "harry", "hyd", 22, "harry@gmail.com"));
		
		when(service.getAllStudents()).thenReturn(studentList);
		
		ResponseEntity<List<Student>> resEntity = (ResponseEntity<List<Student>>) controller.getAllStudents();
		
		assertEquals(HttpStatus.OK, resEntity.getStatusCode());
		assertEquals(2, resEntity.getBody().size());
	}
	
	@Test
	public void getStudentByIdTest()
	{
		Student student = new Student(45, "harry", "hyd", 22, "harry@gmail.com");
		when(service.findStudentById(45)).thenReturn(student);
		
		ResponseEntity<Student> res = (ResponseEntity<Student>) controller.findById(45);
		
		assertEquals(HttpStatus.OK, res.getStatusCode());
		assertEquals(45, res.getBody().getStudentId());
		assertEquals("harry", res.getBody().getStudentName());
	}
	
	@Test
	public void addStudentTest() throws StudentExistsAlreadyException
	{
		Student student = new Student(45, "harry", "hyd", 22, "harry@gmail.com");
		
		when(service.addStudent(student)).thenReturn(student);
		
		ResponseEntity<Student> res = (ResponseEntity<Student>) controller.addStudent(student);
		
		assertEquals(HttpStatus.CREATED, res.getStatusCode());
		assertEquals(student, res.getBody());
		
		
	}

}
















