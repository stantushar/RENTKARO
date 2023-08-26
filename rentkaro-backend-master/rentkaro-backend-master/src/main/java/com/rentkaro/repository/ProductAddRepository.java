package com.rentkaro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentkaro.pojos.Product;

public interface ProductAddRepository extends JpaRepository<Product, Long> {

}