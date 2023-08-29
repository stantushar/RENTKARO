package com.rentkaro.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excceptions.CustomException;
import com.rentkaro.dto.MyProductDTO;
import com.rentkaro.dto.OrderListDTO;
import com.rentkaro.dto.ProductDTO;
import com.rentkaro.dto.ProfileDTO;
import com.rentkaro.dto.ReturnProdDTO;
import com.rentkaro.dto.UpdateProfileDTO;
import com.rentkaro.pojos.OrderHistory;
import com.rentkaro.pojos.Product;
import com.rentkaro.pojos.User;
import com.rentkaro.pojos.UserAddress;
import com.rentkaro.repository.ProductRepository;
import com.rentkaro.repository.UserRepository;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	public UserRepository userRepo;
	@Autowired
	public ModelMapper modelMap;
	@Autowired
	public ProductRepository productRepo;

	@Override
	public String deleteAccount(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		userRepo.delete(user);
		return "User " + user.getFirstName() + " " + user.getLastName() + " details deleted!";
	}

	@Override
	public ProfileDTO userDetails(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		return new ProfileDTO(user.getFirstName(), user.getLastName(), user.getUserEmail(), user.getUserMobileNo(),
				user.getUserAddress().getAddress1(), user.getUserAddress().getAddress2(),
				user.getUserAddress().getCity(), user.getUserAddress().getState(), user.getUserAddress().getPincode(),
				user.getUserAddress().getCountry());
	}

	@Override
	public UpdateProfileDTO updateDetails(Long id, UpdateProfileDTO profile) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		user.setFirstName(profile.getFirstName());
		user.setLastName(profile.getLastName());
		UserAddress userAddress = user.getUserAddress();
		userAddress.setAddress1(profile.getAddress1());
		userAddress.setAddress2(profile.getAddress2());
		userAddress.setCity(profile.getCity());
		userAddress.setState(profile.getState());
		userAddress.setPincode(profile.getPincode());
		userAddress.setCountry(profile.getCountry());
		user.setUserAddress(userAddress);
		userRepo.save(user);
		return modelMap.map(user, UpdateProfileDTO.class);
	}

	@Override
	public List<MyProductDTO> myProducts(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		List<MyProductDTO> products = new ArrayList<>();
		List<Product> productOBJS = user.getOwnedProductList();
		for (Product productOBJ : productOBJS) {
			products.add(new MyProductDTO(productOBJ.getProductId(),productOBJ.getOwner().getId(),productOBJ.getProductName(),productOBJ.getProductDescription(),productOBJ.getProductFeatures(),productOBJ.getRentalPrice(),productOBJ.getDeposite(),productOBJ.getCategory(),productOBJ.getRating(),null,productOBJ.getProductComplain(),productOBJ.getImgPath1(),productOBJ.getImgPath2()));
		}
		
		return products;
	}

	@Override
	public String updateProduct(int prodId, ProductDTO product, Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		Product productOBJ = user.getOwnedProductList().get(prodId);
		productOBJ.setProductName(product.getProductName());
		productOBJ.setProductDescription(product.getProductDescription());
		productOBJ.setProductFeatures(product.getProductFeatures());
		productOBJ.setRentalPrice(product.getRentalPrice());
		productOBJ.setDeposite(product.getDeposite());
		productOBJ.setCategory(product.getCategory().toString());
		productRepo.save(productOBJ);
		return "Product Updated Successfully";
	}

	@Override
	public String deleteProduct(int prodId, Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
//		Product productOBJ = user.getOwnedProductList().get(prodId);
		//		productRepo.delete(productOBJ);
		if(user.getOwnedProductList().get(prodId).getRenter()==null) {
			user.getOwnedProductList().remove(prodId);
			return "Product Deleted Successfully";
		}
		return "Product alredy Rented by someone! cannot delete";
	}
	
	@Override
	public List<ProductDTO> rentedProducts(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		List<ProductDTO> products = new ArrayList<>();
		Product productOBJ = user.getRentedProduct();
		if(productOBJ!=null) products.add(modelMap.map(productOBJ, ProductDTO.class));
//		System.out.println(productOBJ);
		return products;
	}
	
	@Override
	public List<OrderListDTO> orderHistory(Long id) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		List<OrderListDTO> products = new ArrayList<>();
		List<OrderHistory> productOBJS = user.getOrderList();
		for (OrderHistory productOBJ : productOBJS) {
			products.add(modelMap.map(productOBJ, OrderListDTO.class));
		}
		
		return products;
	}

	@Override
	public String returnProduct(Long id,ReturnProdDTO prod) {
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		Product product = productRepo.findByRenter(user).orElseThrow(() -> new CustomException("No Product Rented!!!!!"));
		if(product.getOtp()!=prod.getOtp()) return "Sorry but OTP does not match";
		if(product.getRating()==null) {
			product.setRating(prod.getRating());
		}
		else {
			product.setRating((product.getRating()+prod.getRating())/2);
		}
		product.setRenter(null);
		product.setOtp(null);
		productRepo.save(product);
		return "Product Return Successfully you get Deposite in 2 or 3 Working days!";
	}


	@Override
	public Product returnProductRequest(Long id) {
		// TODO Auto-generated method stub
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		return productRepo.findByRenter(user).orElseThrow(() -> new CustomException("No Product Rented!!!!!"));
	}
	
	

}
