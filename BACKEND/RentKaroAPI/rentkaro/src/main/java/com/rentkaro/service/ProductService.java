package com.rentkaro.service;

import java.util.List;

import com.rentkaro.dto.ProductDTO;

public interface ProductService {
	String addProduct(Long id,ProductDTO obj);

	List<ProductDTO> displayProducts(Long id);

	List<ProductDTO> displayProductsByCategory(Long id,String category);	
}
