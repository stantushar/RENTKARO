package com.rentkaro.dto;

import com.rentkaro.pojos.Categories;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductDTO {

	private Long productId;
	private String productName;
	private String productDescription;
	private Double rentalPrice;
	private Boolean isAvailable;
	private Categories category;

}
