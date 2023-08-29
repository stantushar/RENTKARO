package com.rentkaro.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class OrderListDTO {
	private String productName;
	private String productDescription;
	private String productFeatures;
	private Double rentalPrice;
	private Double deposite;
	private LocalDate rentalDate;	
	private LocalDate returnDate;
	private Long transactionId;
	private Float rating;
}
