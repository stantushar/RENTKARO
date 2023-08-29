package com.rentkaro.exception_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice 
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?>handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
		System.out.println("in method arg invalid "+ e);
		List<FieldError> fieldErrors= e.getFieldErrors();
		Map<String,String> map =  fieldErrors.stream().collect(Collectors.toMap(f-> f.getField(), f->f.getDefaultMessage()));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
}
