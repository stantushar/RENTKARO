package com.rentkaro.pojos;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;
	private String productName;
	private String productDescription;
	private String productFeatures;
	private Double rentalPrice;
	private Double deposite;
	private LocalDate rentalDate;	
	private LocalDate returnDate;
	private Long transactionId;
	private Float rating;
	public OrderHistory(String productName, String productDescription, String productFeatures, Double rentalPrice,
			Double deposite, LocalDate rentalDate, LocalDate returnDate, Long transactionId, Float rating) {
		super();
		this.productName = productName;
		this.productDescription = productDescription;
		this.productFeatures = productFeatures;
		this.rentalPrice = rentalPrice;
		this.deposite = deposite;
		this.rentalDate = rentalDate;
		this.returnDate = returnDate;
		this.transactionId = transactionId;
		this.rating = rating;
	}
}
