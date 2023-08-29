package com.rentkaro.dto;

import java.util.List;

import com.rentkaro.pojos.Categories;
import com.rentkaro.pojos.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MyProductDTO {
	private Long productId;
	private Long ownerId;
	private String productName;
	private String imgPath1;
	private String imgPath2;
	private String productDescription;
	private String productFeatures;
	private Double rentalPrice;
	private Double deposite;
	private Categories category;
	private Float rating;
	private User renter;
	private int productComplain;
	private byte[] prodImg1;
	private byte[] prodImg2;
	
	public MyProductDTO(Long productId,Long ownerId,String productName, String productDescription, String productFeatures, Double rentalPrice,
			Double deposite, String category,Float rating,User renter,int productComplain,String imgPath1,String imgPath2) {
		super();
		this.ownerId = ownerId;
		this.productId = productId;
		this.productName = productName;
		this.productDescription = productDescription;
		this.productFeatures = productFeatures;
		this.rentalPrice = rentalPrice;
		this.deposite = deposite;
		this.category = Categories.valueOf(category);
		this.rating = rating;
		this.renter = renter;
		this.productComplain = productComplain;
		this.imgPath1 = imgPath1;
		this.imgPath2 = imgPath2;	
	}
	
	public void setImages(byte[] prodImg1, byte[] prodImg2) {
		this.prodImg1 = prodImg1;
		this.prodImg2 = prodImg2;
	}

}
