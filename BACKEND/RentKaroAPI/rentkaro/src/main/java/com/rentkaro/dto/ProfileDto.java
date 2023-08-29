package com.rentkaro.dto;

import com.rentkaro.pojos.UserAddress;

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
public class ProfileDto {

	private Long id;

	private String firstName;

	private String lastName;

	private String userEmail;
	private String userMobileNo;

	private UserAddress userAddress;

}
