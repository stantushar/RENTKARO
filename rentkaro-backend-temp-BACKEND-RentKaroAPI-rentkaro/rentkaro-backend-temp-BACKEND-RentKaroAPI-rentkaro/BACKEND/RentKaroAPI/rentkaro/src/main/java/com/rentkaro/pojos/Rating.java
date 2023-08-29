//package com.rentkaro.pojos;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToOne;
//import javax.persistence.Table;
//import javax.persistence.Transient;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Getter
//@NoArgsConstructor
//@Entity
//@Table(name = "rating")
//public class Rating {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	@OneToOne
//	@JoinColumn(name = "product")
//	private Product product;
//	// pending under constructor for shreyansh
//	@OneToOne
//	@JoinColumn(name = "renter")
//	private User renter;
//	private Float rating=0f;
//	@Transient
//	private List<String> review = new ArrayList<>();
//	
//	public Rating(Product product, User renter, Float rating, String review) {
//		this.product = product;
//		this.renter = renter;
//		this.rating = (this.rating+rating)/2;
//		this.review.add(review);
//	}
//	
//	public void setRating(Float rating) {
//		this.rating = (this.rating+rating)/2;
//	}
//	
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public void setProduct(Product product) {
//		this.product = product;
//	}
//
//	public void setRenter(User renter) {
//		this.renter = renter;
//	}
//
//	public void setReview(List<String> review) {
//		this.review = review;
//	}
//	
//	public void setReview(String review) {
//		this.review.add(review);
//	}
//}
