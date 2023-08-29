package com.rentkaro.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentkaro.pojos.Product;
import com.rentkaro.pojos.User;

public interface ProductRepository extends JpaRepository<Product, Long> {
//	Optional<List<Product>> findByRenterIsNull();
	
	Optional<List<Product>> findByRenterIsNullAndOwnerNot(User user);
	
	Optional<List<Product>> findByRenterIsNullAndOwnerNotAndCategory(User user,String category);

	Optional<Product> findByProductIdAndOwnerNot(Long prodId, User userObj);
	
	Optional<Product> findByRenter(User user);
}
