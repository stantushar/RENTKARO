package com.rentkaro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.service.ProfileService;

@RestController @RequestMapping("/profile")
public class ProfileController {
	
	@Autowired
	public ProfileService profileService;
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser( @PathVariable Long id)
	{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.deleteAccount());
	}
}
