package com.rentkaro.controller;

import static org.apache.commons.io.FileUtils.readFileToByteArray;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.ProductDTO;
import com.rentkaro.service.ImageHandlingService;
import com.rentkaro.service.ProductService;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HomeController {
	@Autowired
	public ProductService productService;
	
	@Autowired
	private ImageHandlingService imageService;

	public HomeController() {
		System.out.println("Home controller bean created");
	}
	
	@GetMapping
	public List<ProductDTO> displayProducts(HttpServletRequest request) throws IOException {
		Long id = (Long)request.getSession().getAttribute("id");
		List<ProductDTO> prods = productService.displayProducts(id);
		for(ProductDTO prod : prods) {
			String path1 = prod.getImgPath1();
			String path2 = prod.getImgPath2();
			prod.setImages(readFileToByteArray(new File(path1)), readFileToByteArray(new File(path2)));
		}
		return prods;
	}
	
	@GetMapping("/{category}")
	public List<ProductDTO> displayProductsByCategory(@PathVariable String category,HttpServletRequest request) throws IOException {
		Long id = (Long)request.getSession().getAttribute("id");
		List<ProductDTO> prods = productService.displayProductsByCategory(id,category);
		for(ProductDTO prod : prods) {
			String path1 = prod.getImgPath1();
			String path2 = prod.getImgPath2();
			prod.setImages(readFileToByteArray(new File(path1)), readFileToByteArray(new File(path2)));
		}
		return prods;
	}
}
