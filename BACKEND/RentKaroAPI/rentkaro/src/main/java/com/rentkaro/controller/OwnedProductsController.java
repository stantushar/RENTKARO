package com.rentkaro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.ApiResponse;
import com.rentkaro.dto.UpdateProductDTO;
import com.rentkaro.service.ProfileService;

@RestController @RequestMapping("/ownedproducts")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnedProductsController {

	@Autowired
	public ProfileService profileService;
	
		
	@GetMapping("/{id}")
	public ResponseEntity<?> getOwnedProducts(@PathVariable Long id) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.getOwnedProducts(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@PutMapping("/ownedproducts/{id}")
	public ResponseEntity<?> updateProductFromOwnedProducts(@PathVariable Long id, @RequestBody UpdateProductDTO productDto) {
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.updateOwnedProducts(id,productDto));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
//	@DeleteMapping("/ownedproducts/{id}/{productId}")
//	public ResponseEntity<?> deleteProductFromOwnedProducts(@PathVariable Long id, @PathVariable Long productId) {
//		try {
//			return ResponseEntity.status(HttpStatus.ACCEPTED).body(profileService.deleteProductFromOwnedProducts(id,productId));
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
//		}
//	}

}
