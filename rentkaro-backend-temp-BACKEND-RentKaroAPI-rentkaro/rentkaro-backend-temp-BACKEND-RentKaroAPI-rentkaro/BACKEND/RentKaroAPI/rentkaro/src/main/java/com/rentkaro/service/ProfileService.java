package com.rentkaro.service;

import java.util.List;

import com.rentkaro.dto.MyProductDTO;
import com.rentkaro.dto.OrderListDTO;
import com.rentkaro.dto.ProductDTO;
import com.rentkaro.dto.ProfileDTO;
import com.rentkaro.dto.ReturnProdDTO;
import com.rentkaro.dto.UpdateProfileDTO;
import com.rentkaro.pojos.Product;

public interface ProfileService {

//	String deleteAccount(User user);
	String deleteAccount(Long id);
	
//	ProfileDTO userDetails(User user);
	ProfileDTO userDetails(Long id);

//	String updateDetails(User user,ProfileDTO profile);
	UpdateProfileDTO updateDetails(Long id,UpdateProfileDTO profile);

//	List<ProductDTO> myProducts(User user);
	List<MyProductDTO> myProducts(Long id);

	String updateProduct(int prodId, ProductDTO product, Long id);

	String deleteProduct(int prodId, Long id);
	
	List<ProductDTO> rentedProducts(Long id);
	
	List<OrderListDTO> orderHistory(Long id);

	String returnProduct(Long id,ReturnProdDTO prod);
	
	Product returnProductRequest(Long id);

}
