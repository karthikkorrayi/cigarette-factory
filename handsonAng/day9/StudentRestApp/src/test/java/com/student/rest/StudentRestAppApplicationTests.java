package com.student.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.client.RestTemplate;

import com.student.rest.model.Student;
import com.student.rest.repository.StudentRepo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class StudentRestAppApplicationTests {


	@Autowired
	StudentRepo repo; 
	
	@LocalServerPort
	private int port;

	private String baseUrl = "http://localhost";

	private static RestTemplate restTemplate;

	@BeforeAll
	public static void init() {
		restTemplate = new RestTemplate();
	}

	@BeforeEach
	public void setUp() {
		baseUrl = baseUrl.concat(":").concat(port + "").concat("/students");
	}
	
//	 @Test
//	    public void testAddProduct() {
//	        Student student = new Student(101, "zaid", "blore", 121, "z@gmail");
//	        Student response = restTemplate.postForObject(baseUrl, student, Student.class);
//	        assertEquals("zaid", response.getStudentName());
//	        assertEquals(1, repo.findAll().size());
//	    }

}
