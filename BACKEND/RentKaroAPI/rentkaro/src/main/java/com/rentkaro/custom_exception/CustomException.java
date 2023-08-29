package com.rentkaro.custom_exception;

@SuppressWarnings("serial")
public class CustomException extends RuntimeException {
	public CustomException(String mesg) {
		super(mesg);
	}
}
