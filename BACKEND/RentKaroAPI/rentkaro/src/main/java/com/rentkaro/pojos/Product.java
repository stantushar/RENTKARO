package com.rentkaro.pojos;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.rentkaro.dto.ProductDTO;

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
public class Product extends ProductEntity {

	@Column(name = "product_name", length = 50)
	private String productName;
	@Column(name = "product_description", length = 150)
	private String productDescription;
	@OneToOne
	@JoinColumn(name = "rating")
	private Rating rating;
	@Column(name = "img_path_1")
	private String imgPath1;
	@Column(name = "img_path_2")
	private String imgPath2;
	@Column(name = "product_features")
	private String productFeatures;
	// price is per day rent of product
	@Column(name = "rental_price")
	private Double rentalPrice;
//	@Column(name = "deposite_token")
//	private Double deposite;
	@Column(name = "is_available")
	private Boolean isAvailable;
	@ManyToOne
	@JoinColumn(name = "owner")
	private User owner;
	@OneToOne
	@JoinColumn(name = "renter")
	private User renter;
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private Category category;
	@ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	@JoinTable(name = "product_wishlist", joinColumns = @JoinColumn(name = "Product_ID", referencedColumnName = "productId"), inverseJoinColumns = @JoinColumn(name = "WishList_ID", referencedColumnName = "Id"))
	private Set<WishList> wishList = new HashSet<WishList>();

	
	public void addUser(User obj) {
		this.owner = obj;
	}

	public void removeUser() {
		this.owner = null;
	}
	
}
