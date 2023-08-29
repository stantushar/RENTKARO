package com.rentkaro;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RentkaroApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentkaroApplication.class, args);
	}

	@Bean
	public static ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
