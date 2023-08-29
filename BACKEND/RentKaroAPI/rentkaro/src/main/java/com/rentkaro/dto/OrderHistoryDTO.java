package com.rentkaro.dto;

import java.time.LocalDate;

import com.rentkaro.pojos.Product;
import com.rentkaro.pojos.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryDTO {
	private Long orderId;
	private Long productId;
	private Long renterId;
	private LocalDate orderedDate;
	private Long transactionId;
	private Double amount; // no. of days to rent * product price rent/ day
	
//	public OrderHistoryDTO(Long orderId,Product productId, User rentId,LocalDate orderedDate,Long transactionId,Double amount) {
//		this.orderId=orderId;
//		this.productId=new Product();
//		this.renterId=renterId;
//		this.orderedDate=orderedDate;
//		this.transactionId=transactionId;
//		this.amount=amount;
//	}
	
//	public void setProductId(Long pId) {
//		this.productId=pId;
//	}
//	
//	public void setRenterId(Long rId) {
//		this.renterId=rId;
//	}
	
}
