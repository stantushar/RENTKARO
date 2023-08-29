package com.rentkaro.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.rentkaro.pojos.Category;
import com.rentkaro.pojos.Rating;

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
	private Category category;

}
