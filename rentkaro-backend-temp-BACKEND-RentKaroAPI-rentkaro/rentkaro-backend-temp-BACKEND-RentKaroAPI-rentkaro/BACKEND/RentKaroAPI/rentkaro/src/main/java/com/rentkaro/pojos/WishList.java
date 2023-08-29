package com.rentkaro.pojos;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "wish_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WishList extends UserEntity {

	@OneToOne
	@JoinColumn(name = "userId")
	private User user;
	@ManyToMany(mappedBy = "wishList", fetch = FetchType.LAZY)
	private Set<Product> productList = new HashSet<Product>();

	// P wishlist
	// 1 product can be in many wishlist
	//

}
