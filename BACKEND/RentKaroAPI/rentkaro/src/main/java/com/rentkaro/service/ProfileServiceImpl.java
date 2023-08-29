package com.rentkaro.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentkaro.dto.OrderHistoryDTO;
import com.rentkaro.dto.ProductDTO;
import com.rentkaro.dto.ProfileDto;
import com.rentkaro.dto.UpdateProductDTO;
import com.rentkaro.pojos.Product;
import com.rentkaro.pojos.User;
import com.rentkaro.repository.ProductRepository;
import com.rentkaro.repository.UserRepository;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public String deleteAccount(Long id) {
		if (id != null) {
			userRepo.deleteById(id);
			return "Account Deleted.";
		}
		return "Account Not Deleted.";
	}

	@Override
	public ProfileDto myProfile(Long id) {

		User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("Invalid Id."));
		ProfileDto profile = modelMapper.map(user, ProfileDto.class);
		return profile;
	}

	@Override
	public String editProfile(ProfileDto profiledto) {
		try {
			User user = userRepo.findById(profiledto.getId()).orElseThrow(() -> new RuntimeException("Invalid Id."));

			user.setFirstName(profiledto.getFirstName());
			user.setLastName(profiledto.getLastName());
			user.setUserEmail(profiledto.getUserEmail());
			user.setUserMobileNo(profiledto.getUserMobileNo());
			user.getUserAddress().setAddress1(profiledto.getUserAddress().getAddress1());
			user.getUserAddress().setAddress2(profiledto.getUserAddress().getAddress2());
			user.getUserAddress().setCity(profiledto.getUserAddress().getCity());
			user.getUserAddress().setCountry(profiledto.getUserAddress().getCountry());
			user.getUserAddress().setPincode(profiledto.getUserAddress().getPincode());
			user.getUserAddress().setState(profiledto.getUserAddress().getState());
			userRepo.save(user);

			return "Profile Updated";
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public List<OrderHistoryDTO> getOrderList(Long id) {
		try {
			// This user is fetched to check whether it is persistent or not.
			User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User does not exist."));
			User persistentUser = userRepo.findByIdWithOrderList(id)
					.orElseThrow(() -> new RuntimeException("Invalid Id."));
			System.err.println(persistentUser.getId());
			persistentUser.getOrderList().stream().forEach((p) -> System.err.println(p.getProduct().getProductId()));
			return persistentUser.getOrderList().stream().map(p -> new OrderHistoryDTO(p.getOrderId(),
					p.getProduct().getProductId(), p.getRenterList().getId(), p.getOrderedDate(), p.getTransactionId(), p.getAmount())).collect(Collectors.toList());
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public List<ProductDTO> getOwnedProducts(Long id) {
		try {
			User user = userRepo.findByIdWithOwnedProductList(id)
					.orElseThrow(() -> new RuntimeException("Invalid Id."));

			return user.getOwnedProductList().stream().map(p -> modelMapper.map(p, ProductDTO.class))
					.collect(Collectors.toList());
		} catch (Exception e) {

			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public String updateOwnedProducts(Long ownerId, UpdateProductDTO productDto) {
		try {
			User user = userRepo.findById(ownerId).orElseThrow(() -> new RuntimeException("Invalid Id."));
			boolean doesUserHasProduct = user.getOwnedProductList().stream()
					.anyMatch(p -> p.getProductId().equals(productDto.getProductId()));
			if (doesUserHasProduct) {
				Product persistentProduct = productRepo.findById(productDto.getProductId())
						.orElseThrow(() -> new RuntimeException("Invalid Id."));

				persistentProduct.setProductName(productDto.getProductName());
				persistentProduct.setProductDescription(productDto.getProductDescription());
				persistentProduct.setRentalPrice(productDto.getRentalPrice());
				persistentProduct.setIsAvailable(productDto.getIsAvailable());
				persistentProduct.setCategory(productDto.getCategory());

				productRepo.save(persistentProduct);

				return "Updation succeed.";
			}
			return "Updation failed.";
		} catch (Exception e) {

			throw new RuntimeException(e.getMessage());
		}
	}

//	@Override
//	public String deleteProductFromOwnedProducts(Long id, Long productId) {
//		try {
//			User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("Invalid Id."));
//			Product persistentProduct = user.getOwnedProductList().stream()
//					.filter(p -> p.getProductId().equals(productId)).findFirst()
//					.orElseThrow(() -> new RuntimeException("User doesn't have product with " + productId));
//
//			user.getOrderList().stream().forEach((p) -> System.err.println(p.getProduct().getProductId()));
//			System.err.println(persistentProduct.getProductId());
//			user.removeProductFromOwnedProductList(persistentProduct);
//			userRepo.save(user);
//
//			return "product deleted.";
//		} catch (Exception e) {
//			throw new RuntimeException(e.getMessage());
//		}
//	}

}
