package com.rentkaro.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user_address")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserAddress extends UserEntity {

	@Column(name = "address1", length = 50)
	private String address1;
	@Column(name = "address2", length = 50)
	private String address2;
	@Column(name = "city", length = 30)
	private String city;
	@Column(name = "state", length = 20)
	private String state;
	@Column(name = "pincode")
	private Long pincode;
	@Column(name = "country", length = 20)
	private String Country;
}