/*
 * package com.rentkaro.pojos;
 * 
 * import java.util.ArrayList; import java.util.List;
 * 
 * import javax.persistence.CascadeType; import javax.persistence.Column; import
 * javax.persistence.Entity; import javax.persistence.GeneratedValue; import
 * javax.persistence.GenerationType; import javax.persistence.Id; import
 * javax.persistence.OneToMany; import javax.persistence.Table;
 * 
 * import lombok.AllArgsConstructor; import lombok.Getter; import
 * lombok.NoArgsConstructor; import lombok.Setter;
 * 
 * @Entity
 * 
 * @Getter
 * 
 * @Table(name = "category")
 * 
 * @Setter
 * 
 * @NoArgsConstructor
 * 
 * @AllArgsConstructor public class Category {
 * 
 * @Id
 * 
 * @GeneratedValue(strategy = GenerationType.IDENTITY) private Long categoryId;
 * 
 * @Column(name = "category_name") private String categoryName;
 * 
 * @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval =
 * true) private List<Product> categoryProductsList = new ArrayList<Product>();
 * }
 */