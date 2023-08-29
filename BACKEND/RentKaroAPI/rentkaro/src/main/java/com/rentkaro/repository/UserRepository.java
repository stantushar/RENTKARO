package com.rentkaro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rentkaro.pojos.User;

public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.ownedProductList WHERE u.id = :userId")
    Optional<User> findByIdWithOwnedProductList(@Param("userId") Long userId);
	
	@Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orderList WHERE u.id = :userId")
    Optional<User> findByIdWithOrderList(@Param("userId") Long userId);
	
}
