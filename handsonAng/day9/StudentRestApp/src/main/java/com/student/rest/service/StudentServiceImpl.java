package com.student.rest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.rest.exception.StudentDoesNotExistException;
import com.student.rest.exception.StudentExistsAlreadyException;
import com.student.rest.model.Student;
import com.student.rest.repository.StudentRepo;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	StudentRepo repo;
	
	@Override
	public Student addStudent(Student s) throws StudentExistsAlreadyException {
		
		Student student = findStudentById(s.getStudentId());
		
		if(student !=null)
		{
			throw new StudentExistsAlreadyException();
		}
		
		else
		{
			Student savedStudent = repo.save(s);
			return savedStudent;
		}
		
	}

	@Override
	public Student findStudentById(int sid) {
		
		Optional<Student> optional = repo.findById(sid);
		
		if(optional.isPresent())
		{
			return optional.get();
		}
		
		return null;
	}

	@Override
	public List<Student> getAllStudents() {
		
		List<Student> allStudents = repo.findAll();
		return allStudents;
	}

	@Override
	public boolean deleteStudent(int sid) {
		
//		Student student = findStudentById(sid);
		
		Optional<Student> findById = repo.findById(sid);
		
		if(findById.isPresent())
		{
			repo.deleteById(sid);
			return true;
		}
		
		return false;
	}

	@Override
	public Student updateStudent(Student stdNew) {
		
		Student student = findStudentById(stdNew.getStudentId());
		
		if(student != null)
		{
			student.setStudentName(stdNew.getStudentName());
			student.setStudentAddress(stdNew.getStudentAddress());
			student.setStudentAge(stdNew.getStudentAge());
			student.setStudentEmail(stdNew.getStudentEmail());
			
			Student savedStudent = repo.save(student);
			return savedStudent;
		}
		
		
		
		return null;
	}

	@Override
	public List<Student> findStudentsByAddress(String studentAddress) throws StudentDoesNotExistException {
		List<Student> findByStudentAddress = repo.findByStudentAddress(studentAddress);
		
		if(findByStudentAddress.isEmpty())
		{
			throw new StudentDoesNotExistException();
		}
		else
			return findByStudentAddress;
	}

}












