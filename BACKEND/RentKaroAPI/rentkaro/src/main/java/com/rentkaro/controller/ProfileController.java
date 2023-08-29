package com.rentkaro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.ProfileDto;
import com.rentkaro.service.ProfileService;


@RestController @RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
	
	@Autowired
	public ProfileService profileService;
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser( @PathVariable Long id)
	{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.deleteAccount(id));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> myProfile(@PathVariable Long id)
	{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.myProfile(id));
	}
	
	@PostMapping
	public ResponseEntity<?> editProfile(@RequestBody ProfileDto profiledto)
	{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.editProfile(profiledto));
	}
}
