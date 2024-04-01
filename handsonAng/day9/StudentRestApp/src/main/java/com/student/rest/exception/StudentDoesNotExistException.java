package com.student.rest.exception;

public class StudentDoesNotExistException extends Exception {

	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return "Student does not exist";
	}
}