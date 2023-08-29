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
public class UpdateProfileDTO {
	private String firstName;
	private String lastName;
//	private String imgPath;
	private String address1;
	private String address2;
	private String city;
	private String state;
	private Long pincode;
	private String Country;
}
