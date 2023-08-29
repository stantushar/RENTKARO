package com.rentkaro.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name = "user_info")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "userAddress")
public class User extends UserEntity {

	@Column(name = "first_name", length = 50)
	private String firstName;
	@Column(name = "last_name", length = 50)
	private String lastName;
	@Column(name = "img_path")
	private String imgPath;
	@Column(name = "email_id", length = 50, unique = true)
	private String userEmail;
	@Column(name = "user_password")
	private String userPassword;
//	@Transient
//	private String coinfirmPassword;
	@Column(name = "user_mobile_no", unique = true)
	private Long userMobileNo;
	@Column(name = "is_ban",columnDefinition = "tinyint(1) default 0")
	private boolean isBan;
	@Column(name = "auth_key")
	private String authKey;
	@Column(name = "reports")
	private byte reports;
	@Column(name = "is_subscribe",columnDefinition = "tinyint(1) default 0")
	private boolean isSub;
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_address_id")
	private UserAddress userAddress;
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Product> ownedProductList = new ArrayList<Product>();
//	@OneToMany(mappedBy = "renter", cascade = CascadeType.ALL, orphanRemoval = true)
//	@Transient
	@OneToOne(mappedBy = "renter", cascade = CascadeType.ALL)
	private Product rentedProduct;
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "cart")
	private WishList cart;
	@OneToMany( cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "orderList")
	List<OrderHistory> orderList = new ArrayList<OrderHistory>();
	
	public void addToOrderList(OrderHistory obj) {
		this.orderList.add(obj);
	}

}
