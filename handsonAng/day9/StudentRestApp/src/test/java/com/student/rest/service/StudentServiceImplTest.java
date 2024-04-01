package com.student.rest.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.student.rest.exception.StudentExistsAlreadyException;
import com.student.rest.model.Student;
import com.student.rest.repository.StudentRepo;

@SpringBootTest(classes = {StudentService.class})
class StudentServiceImplTest {

	@Mock
	StudentRepo repo;
	
	@InjectMocks
	StudentServiceImpl service;
	
	@Test
	public void getAllStudentsTest()
	{
		List<Student> studentList = new ArrayList<Student>();
		studentList.add(new Student(67, "sam", "blr", 23, "sam@gmail.com"));
		studentList.add(new Student(45, "harry", "hyd", 22, "harry@gmail.com"));
		
		when(repo.findAll()).thenReturn(studentList);
		
		assertEquals(2, service.getAllStudents().size());
	}
	
	
	@Test
	public void findByIdTest()
	{

		
		Student student = new Student(67, "sam", "blr", 23, "sam@gmail.com");
		Optional<Student> optStudent = Optional.of(student);
		
		when(repo.findById(67)).thenReturn(optStudent);
		
		assertEquals(67, service.findStudentById(67).getStudentId());
		
	}
	
	@Test
	public void addStudentTest() throws StudentExistsAlreadyException
	{
		Student student = new Student(67, "sam", "blr", 23, "sam@gmail.com");
		
		when(repo.save(student)).thenReturn(student);
		
		assertEquals(student, service.addStudent(student));
	}
	
	@Test
	public void deleteStudentTest()
	{
		Student student = new Student(67, "sam", "blr", 23, "sam@gmail.com");
		Optional<Student> optStudent = Optional.of(student);
		
		when(repo.findById(67)).thenReturn(optStudent);
		boolean b = service.deleteStudent(67);
		assertTrue(b);
		
		verify(repo, times(1)).deleteById(67);
		
	}
	
}















