package com.student.rest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.student.rest.model.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
	
	public Student findByStudentName(String name);
	
	public List<Student> findByStudentAge(int age);
	
	@Query(value ="select std from Student std")
	public List<Student> getAllStd();
	
	public List<Student> findByStudentAddress(String studentAddress);

}
