package com.rentkaro.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excceptions.CustomException;
import com.rentkaro.dto.MyProductDTO;
import com.rentkaro.dto.ProductDTO;
import com.rentkaro.dto.SellProductDTO;
import com.rentkaro.pojos.OrderHistory;
import com.rentkaro.pojos.Product;
import com.rentkaro.pojos.User;
import com.rentkaro.repository.ProductRepository;
import com.rentkaro.repository.UserRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	public ProductRepository productRepo;
	@Autowired
	public ModelMapper modelMap;
	@Autowired
	public UserRepository userRepo;
	

	@Override
	public Long addProduct(Long id,SellProductDTO obj) {
		Product productObj = modelMap.map(obj, Product.class);
		User userObj = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
//		userObj.addOwnProduct(productObj);
		String otp = Double.toString(Math.floor(Math.random()*1000000));
		productObj.setOwner(userObj);
		productObj.setOtp(otp);
		productRepo.save(productObj);
		return productObj.getProductId();
	}

//	@Override
//	public List<ProductDTO> displayProducts(Long id) {
//		List<ProductDTO> products = new ArrayList<>();
//		List<Product> productOBJS =  productRepo.findByRenterIsNull()
//				.orElseThrow(() -> new CustomException("No Products Found"));;
//		for(Product productOBJ : productOBJS) {
//			if(!productOBJ.getOwner().getId().equals(id)) {
//				products.add(new ProductDTO(productOBJ.getProductName(),productOBJ.getProductDescription(),productOBJ.getProductFeatures(),productOBJ.getRentalPrice(),productOBJ.getDeposite(),productOBJ.getCategory()));
//			}
//		}
//		return products;
//	}
	
	@Override
	public List<ProductDTO> displayProducts(Long id) {
		List<ProductDTO> products = new ArrayList<>();
		User userObj = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		List<Product> productOBJS =  productRepo.findByRenterIsNullAndOwnerNot(userObj)
				.orElseThrow(() -> new CustomException("No Products Found"));;
		for(Product productOBJ : productOBJS) {
				products.add(modelMap.map(productOBJ, ProductDTO.class));
		}
		return products;
	}
	
	@Override
	public List<ProductDTO> displayProductsByCategory(Long id,String category) {
		List<ProductDTO> products = new ArrayList<>();
		User userObj = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		List<Product> productOBJS =  productRepo.findByRenterIsNullAndOwnerNotAndCategory(userObj,category)
				.orElseThrow(() -> new CustomException("No Products Found"));;
		for(Product productOBJ : productOBJS) {
				products.add(modelMap.map(productOBJ, ProductDTO.class));
		}
		return products;
	}
	
	@Override
	public MyProductDTO displayProduct(Long prodId) {
//		Rating rating = new Rating();
		Product productOBJ = productRepo.findById(prodId).orElseThrow(() -> new CustomException("Invalid product id !!!!!"));
//		if(productOBJ.getRating()!=null) {
//			rating = productOBJ.getRating();
//		}
		return new MyProductDTO(productOBJ.getProductId(),productOBJ.getOwner().getId(),productOBJ.getProductName(),productOBJ.getProductDescription(),productOBJ.getProductFeatures(),productOBJ.getRentalPrice(),productOBJ.getDeposite(),productOBJ.getCategory(),productOBJ.getRating(),null,productOBJ.getProductComplain(),productOBJ.getImgPath1(),productOBJ.getImgPath2());
	}

	@Override
	public String rentProduct(Long id,Long prodId) {
		User userObj = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		Product productOBJ = productRepo.findByProductIdAndOwnerNot(prodId,userObj).orElseThrow(() -> new CustomException("Invalid product id !!!!!"));
		productOBJ.setRenter(userObj);
//		userObj.setRentedProduct(productOBJ);
		OrderHistory obj = new OrderHistory(productOBJ.getProductName(),productOBJ.getProductDescription(),productOBJ.getProductFeatures(),productOBJ.getRentalPrice(),productOBJ.getDeposite(),LocalDate.now(),null,null,productOBJ.getRating());
		userObj.getOrderList().add(obj);
//		productRepo.save(productOBJ);
		userRepo.save(userObj);
		return "Product Rented Succsessfully";
	}

	@Override
	public MyProductDTO displayMyProduct(Long id,int prodId) {
		// TODO Auto-generated method stub
		User user = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		Product productOBJ = user.getOwnedProductList().get(prodId);
		return new MyProductDTO(productOBJ.getProductId(),productOBJ.getOwner().getId(),productOBJ.getProductName(),productOBJ.getProductDescription(),productOBJ.getProductFeatures(),productOBJ.getRentalPrice(),productOBJ.getDeposite(),productOBJ.getCategory(),productOBJ.getRating(),null,productOBJ.getProductComplain(),productOBJ.getImgPath1(),productOBJ.getImgPath2());
	}

}
