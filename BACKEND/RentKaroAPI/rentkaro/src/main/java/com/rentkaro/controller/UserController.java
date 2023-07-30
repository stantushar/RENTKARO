package com.rentkaro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.UserSignUpDTO;
import com.rentkaro.pojos.User;
import com.rentkaro.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	public UserService userService;

	public UserController() {
		System.out.println("controller bean created");
	}

	@GetMapping
	public String test() {
		return "hi this is demo test to check controller ";
	}

	@PostMapping
	public User addUser(@RequestBody UserSignUpDTO user) {

		return userService.addUser(user);
	}

	
	  @GetMapping("/all")
	  public List<User> getUsers() 
	  { 
		  return userService.getUsers(); 
	  }
	 

}
