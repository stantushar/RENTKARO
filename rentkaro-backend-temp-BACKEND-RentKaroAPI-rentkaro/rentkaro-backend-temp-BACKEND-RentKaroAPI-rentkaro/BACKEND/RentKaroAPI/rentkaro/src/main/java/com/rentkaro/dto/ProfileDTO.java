package com.rentkaro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProfileDTO {
	private String firstName;
	private String lastName;
//	private String imgPath;
	private String userEmail;
	private Long userMobileNo;
	private String address1;
	private String address2;
	private String city;
	private String state;
	private Long pincode;
	private String Country;
}
