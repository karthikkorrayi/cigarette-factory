package com.student.rest.exception;

public class StudentExistsAlreadyException extends Exception {
	
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return "Student already exists";
	}

}
