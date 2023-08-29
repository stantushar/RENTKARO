package com.rentkaro.service;

import java.util.List;

import com.rentkaro.dto.OrderHistoryDTO;
import com.rentkaro.dto.ProductDTO;
import com.rentkaro.dto.ProfileDto;
import com.rentkaro.dto.UpdateProductDTO;

public interface ProfileService {
	
	String deleteAccount(Long id);
	ProfileDto myProfile(Long id);
	String editProfile(ProfileDto profiledto);
	List<OrderHistoryDTO> getOrderList(Long id);
	List<ProductDTO> getOwnedProducts(Long id);
//	String deleteProductFromOwnedProducts(Long id, Long productId);
	String updateOwnedProducts(Long ownerId,UpdateProductDTO productDto);
}
