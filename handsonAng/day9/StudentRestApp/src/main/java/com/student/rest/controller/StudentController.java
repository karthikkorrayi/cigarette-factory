package com.student.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.student.rest.exception.StudentDoesNotExistException;
import com.student.rest.exception.StudentExistsAlreadyException;
import com.student.rest.model.Student;
import com.student.rest.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
	
	@Autowired
	StudentService serv;
	
	@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
	@PostMapping("/addStudent")
	public ResponseEntity<?> addStudent(@RequestBody Student std)
	{
		try {
			Student studentAdded = serv.addStudent(std);
			return new ResponseEntity<Student>(studentAdded, HttpStatus.CREATED);
		} 
		
		catch (StudentExistsAlreadyException e) {
			return new ResponseEntity<String>("Student already Exists", HttpStatus.CONFLICT);
		}
	}
	
	@CrossOrigin(allowedHeaders = "*", origins = "*")
	@GetMapping("/getStudents") 
	public ResponseEntity<?> getAllStudents()
	{
		List<Student> allStudents = serv.getAllStudents();
		return new ResponseEntity<List>(allStudents,HttpStatus.OK);
	}
	
	@CrossOrigin(allowedHeaders = "*", origins = "*")
	@GetMapping("/findById/{studentId}")
	public ResponseEntity<?> findById(@PathVariable int studentId)
	{
		Student student = serv.findStudentById(studentId);
		
		if(student != null)
		{
			return new ResponseEntity<Student>(student, HttpStatus.OK);
		}
		
		else 
		{
			return new ResponseEntity<String>("Student with the given ID is not Found", HttpStatus.NOT_FOUND);
		}
	}
	
	@CrossOrigin(allowedHeaders = "*", origins = "*")
	@GetMapping("/findByAddress/{studentAddress}")
	public ResponseEntity<?> findByAddress(@PathVariable String studentAddress) throws StudentDoesNotExistException
	{
		 List<Student> findStudentsByAddress = serv.findStudentsByAddress(studentAddress);
		
		if(findStudentsByAddress != null)
		{
			return new ResponseEntity<List<Student>>(findStudentsByAddress, HttpStatus.OK);
		}
		
		else 
		{
			return new ResponseEntity<String>("Student with the given ID is not Found", HttpStatus.NOT_FOUND);
		}
	}
	
	public int myMethod(int a, int b){
		return a + b;
	}
	
	@CrossOrigin(allowedHeaders = "*", origins = "*")
	@DeleteMapping("/delete/{studentId}")
	public ResponseEntity<?> deleteByStudentId(@PathVariable int studentId)
	{
		boolean b = serv.deleteStudent(studentId);
		
		if(b)
		{
			return new ResponseEntity<String>("Student record deleted successfully",HttpStatus.OK);
		}
		
		else 
		{
			return new ResponseEntity<String>("Student record not found",HttpStatus.NOT_FOUND);
		}
	}
	
	@CrossOrigin(allowedHeaders = "*", origins = "*")
	@PutMapping("/updateStudent")
	public ResponseEntity<?> updateStudent(@RequestBody Student student)
	{
		
		Student updatedStudent = serv.updateStudent(student);
		
		if(updatedStudent != null)
		{
			return new ResponseEntity<Student>(updatedStudent,HttpStatus.OK);
		}
		else 
		{
			return new ResponseEntity<String>("Student record does not exist", HttpStatus.NOT_FOUND);
		}
	}

}








	



