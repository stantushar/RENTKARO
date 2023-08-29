package com.rentkaro.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rentkaro.dto.MyProductDTO;
import com.rentkaro.dto.SellProductDTO;
import com.rentkaro.service.ImageHandlingService;
import com.rentkaro.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProductController {
	@Autowired
	public ProductService productService;
	
	@Autowired
	private ImageHandlingService imageService;

	public ProductController() {
		System.out.println("product controller bean created");
	}

	@PostMapping("/sell")
	public Long addProduct(@RequestBody SellProductDTO product, HttpServletRequest request) {
		Long id = (Long)request.getSession().getAttribute("id");

		return productService.addProduct(id,product);
	}
	
	@GetMapping("/{prodId}")
	public MyProductDTO displayProduct(@PathVariable Long prodId, HttpServletRequest request) {
		Long id = (Long)request.getSession().getAttribute("id");
		MyProductDTO prod = productService.displayProduct(prodId);
		if(id.equals(prod.getOwnerId())) {
			return prod;
		}
		else {
			prod.setOwnerId(null);
			return prod;
		}
	}
	
	@GetMapping("/myproduct/{prodId}")
	public MyProductDTO displayMyProduct(@PathVariable Integer prodId, HttpServletRequest request) {
		Long id = (Long)request.getSession().getAttribute("id");
		MyProductDTO prod = productService.displayMyProduct(id,prodId);
		return prod;
	}
	
	@GetMapping("/rent/{prodId}")
	public String rentProduct(@PathVariable Long prodId, HttpServletRequest request) {
		Long id = (Long)request.getSession().getAttribute("id");
		return productService.rentProduct(id,prodId);
	}
	
	@PostMapping(value = "/prodimage", consumes = "multipart/form-data")
	public void uploadImage(@RequestParam Long prodid, @RequestParam MultipartFile image1, @RequestParam MultipartFile image2) throws IOException {
		imageService.uploadProdImage(prodid,image1, image2);
	}

	@GetMapping(value = "/prodimage")
	public List<byte[]> downloadImage(@RequestParam Long prodid) throws IOException {
		return imageService.serveProdImage(prodid);
	}
	
}
