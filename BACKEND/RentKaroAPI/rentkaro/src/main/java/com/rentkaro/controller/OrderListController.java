package com.rentkaro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.ApiResponse;
import com.rentkaro.service.ProfileService;

@RestController
@RequestMapping("/orderlist")
public class OrderListController {

	@Autowired
	public ProfileService profileService;

	@GetMapping("/{id}")
	public ResponseEntity<?> getOrderList(@PathVariable Long id) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.getOrderList(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
	
	/*
	 * @GetMapping("/ownedproducts/{id}") public ResponseEntity<?>
	 * getOwnedProducts(@PathVariable Long id) { try { return
	 * ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.
	 * getOwnedProducts(id)); } catch (Exception e) { return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).body(new
	 * ApiResponse(e.getMessage())); } }
	 * 
	 * @GetMapping("/ownedproducts/{id}") public ResponseEntity<?>
	 * updateProductFromOwnedProducts(@PathVariable Long id) { try { return
	 * ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.
	 * getOwnedProducts(id)); } catch (Exception e) { return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).body(new
	 * ApiResponse(e.getMessage())); } }
	 */
}
