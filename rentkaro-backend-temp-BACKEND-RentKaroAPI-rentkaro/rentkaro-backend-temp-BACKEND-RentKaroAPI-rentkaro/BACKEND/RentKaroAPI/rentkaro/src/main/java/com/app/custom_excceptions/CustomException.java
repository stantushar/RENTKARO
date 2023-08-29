package com.app.custom_excceptions;

@SuppressWarnings("serial")
public class CustomException extends RuntimeException {
	public CustomException(String mesg) {
		super(mesg);
	}
}
