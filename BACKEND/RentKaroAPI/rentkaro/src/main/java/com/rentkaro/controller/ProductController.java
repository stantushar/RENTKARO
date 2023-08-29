package com.rentkaro.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.ProductDTO;
import com.rentkaro.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService productService;

	public ProductController() {
		System.out.println("product controller bean created");
	}

	@PostMapping("/sell")
	public String addProduct(@RequestBody ProductDTO product, HttpServletRequest request) {
		Long id = (Long)request.getSession().getAttribute("id");

		return productService.addProduct(id,product);
	}
}
