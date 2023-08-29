package com.rentkaro.dto;

import javax.persistence.Column;

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
public class ProductDTO {

	private Long productId;
	private String productName;
	private String productDescription;
	private String productFeatures;
//	@JsonProperty(access = Access.READ_ONLY)
	private Rating rating;
	private Double rentalPrice;
	private Boolean isAvailable;
	private String imgPath1;
	private String imgPath2;
	private Category category;
}
