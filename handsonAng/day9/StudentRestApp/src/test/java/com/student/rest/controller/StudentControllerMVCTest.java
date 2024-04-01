package com.student.rest.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.student.rest.exception.StudentExistsAlreadyException;
import com.student.rest.model.Student;
import com.student.rest.service.StudentService;


@SpringBootTest
@AutoConfigureMockMvc
class StudentControllerMVCTest {

	@Autowired
	MockMvc mockMvc;

	@Mock
	StudentService service;

	@InjectMocks
	StudentController controller;

	@BeforeEach
	public void setUp()
	{
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
	}


	@Test
	public void addStudentTest() throws Exception
	{
		Student student = new Student(45, "harry", "hyd", 22, "harry@gmail.com");

		when(service.addStudent(student)).thenReturn(student);

		ObjectMapper objectMapper = new ObjectMapper();
		String jsonValueOfStudent = objectMapper.writeValueAsString(student);

		mockMvc.perform(post("/student/addStudent")
				.content(jsonValueOfStudent)
				.contentType(MediaType.APPLICATION_JSON)
				)
		.andExpect(status().isCreated())
		.andDo(print());


	}

	@Test
	public void getAllStudentTest() throws Exception
	{
		List<Student> studentList = new ArrayList<Student>();

		studentList.add(new Student(67, "sam", "blr", 23, "sam@gmail.com"));
		studentList.add(new Student(45, "harry", "hyd", 22, "harry@gmail.com"));
		
		when(service.getAllStudents()).thenReturn(studentList);
		
		mockMvc.perform(get("/student/getStudents"))
		.andExpect(status().isOk())
		.andDo(print());
	}

//	@Test
//	public void getStudentByIdTest() throws Exception
//	{
//		Student student = new Student(45, "harry", "hyd", 22, "harry@gmail.com");
//		when(service.findStudentById(45)).thenReturn(student);
//		
//		mockMvc.perform(get("/student/findById/{studentId}",45))
//		.andExpect(status())
//		.andExpect(jsonPath(".studentId").value(45))
//		.andExpect(jsonPath(".studentName").value("harry")).andDo(print());
//	}























}
