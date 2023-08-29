package com.rentkaro.dto;

import com.rentkaro.pojos.Categories;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProductDTO {
	private Long productId;
	private String productName;
	private byte[] prodImg1;
	private byte[] prodImg2;
	private	String imgPath1;
	private String imgPath2;
	private String productDescription;
	private String productFeatures;
	private Double rentalPrice;
	private Double deposite;
	private Categories category;
	private Float rating;
	
	public ProductDTO(Long prodId, String productName, String productDescription, String productFeatures, Double rentalPrice,
			Double deposite, String category,Float rating,String imgPath1, String imgPath2) {
		super();
		this.productId = prodId;
		this.productName = productName;
		this.productDescription = productDescription;
		this.productFeatures = productFeatures;
		this.rentalPrice = rentalPrice;
		this.deposite = deposite;
		this.category = Categories.valueOf(category);
		this.rating = rating;
		this.imgPath1 = imgPath1;
		this.imgPath2 = imgPath2;
	}
	
	public void setImages(byte[] prodImg1, byte[] prodImg2) {
		this.prodImg1 = prodImg1;
		this.prodImg2 = prodImg2;
	}
	
	
}
