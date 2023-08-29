package com.rentkaro.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
//	@Column(name = "img_path")
//	private String imgPath;
	@Column(name = "email_id", length = 50, unique = true)
	private String userEmail;
	@Column(name = "user_password", length = 50)
	private String userPassword;
	@Column(name = "user_mobile_no", length = 13, unique = true)
	private String userMobileNo;
	@Column(name = "is_ban")
	private boolean isBan;
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_address_id")
	private UserAddress userAddress;
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Product> ownedProductList = new ArrayList<Product>();
	@OneToOne
	@JoinColumn(name = "rented_product", nullable = true)
	private Product rentedProduct;
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "cart")
	private WishList cart;
	@OneToMany(mappedBy = "renterList", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderHistory> orderList = new ArrayList<OrderHistory>();
	@Column(name = "rental_date", nullable = true)
	private LocalDate rentalDate;
	@Column(name = "return_date", nullable = true)
	private LocalDate returnDate;

	public void addUserAddress(UserAddress obj) {
		this.userAddress = obj;
	}

	public void removeUserAddress() {
		this.userAddress = null;
	}

	public void removeProductFromOwnedProductList(Product persistentProduct) {
		this.getOwnedProductList().remove(persistentProduct);
		persistentProduct.setOwner(null);
		persistentProduct.setIsAvailable(false);
		persistentProduct.setRating(null);
		persistentProduct.setRenter(null);
		persistentProduct.setWishList(null);
	}

	public void addOwnProduct(Product obj) {
		this.ownedProductList.add(obj);
	}

	public void removeOwnProduct(int idx) {
		this.ownedProductList.remove(idx);
	}
}
