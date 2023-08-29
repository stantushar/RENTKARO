package com.rentkaro.controller;

import static org.apache.commons.io.FileUtils.readFileToByteArray;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentkaro.dto.MyProductDTO;
import com.rentkaro.dto.OrderListDTO;
import com.rentkaro.dto.ProductDTO;
import com.rentkaro.dto.ProfileDTO;
import com.rentkaro.dto.ReturnProdDTO;
import com.rentkaro.dto.UpdateProfileDTO;
import com.rentkaro.pojos.Product;
import com.rentkaro.service.ProductService;
import com.rentkaro.service.ProfileService;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProfileController {

	@Autowired
	public ProfileService profileService;
	@Autowired
	public ProductService productService;
	@Autowired
	private JavaMailSender mailSender;
	
	public ProfileController() {
		System.out.println("profile controller bean created");
	}

	@DeleteMapping
	public String deleteUser(HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		String msg = profileService.deleteAccount(user);
		Long id = (Long)request.getSession().getAttribute("id");
		String msg = profileService.deleteAccount(id);
		request.getSession().invalidate();
		return msg;
	}
	
	@GetMapping
	public ProfileDTO userDetails(HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.userDetails(user);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.userDetails(id);
	}
	
	@PutMapping 
	public UpdateProfileDTO updateDetails(@RequestBody UpdateProfileDTO profile , HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.updateDetails(user,profile);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.updateDetails(id,profile);
	}
	
	@GetMapping("myproducts")
	public List<MyProductDTO> myProducts(HttpServletRequest request) throws IOException {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.myProducts(user);
		Long id = (Long)request.getSession().getAttribute("id");
		List<MyProductDTO> prods =  profileService.myProducts(id);
		for(MyProductDTO prod : prods) {
			String path1 = prod.getImgPath1();
			String path2 = prod.getImgPath2();
			prod.setImages(readFileToByteArray(new File(path1)), readFileToByteArray(new File(path2)));
		}
		return prods;
		
	}
	
	@GetMapping("orderhistory")
	public List<OrderListDTO> orderHistory(HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.myProducts(user);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.orderHistory(id);
	}
	
	@PutMapping("myproduct/{prodId}")
	public String updateProduct(@PathVariable Integer prodId,@RequestBody ProductDTO product,HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.myProducts(user);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.updateProduct(prodId,product,id);
	}
	
	@DeleteMapping("myproduct/{prodId}")
	public String deleteProduct(@PathVariable Integer prodId,HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.myProducts(user);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.deleteProduct(prodId,id);
	}
	
	@GetMapping("rentedproduct")
	public List<ProductDTO> rentProduct(HttpServletRequest request) {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.myProducts(user);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.rentedProducts(id);
	}
	
//	@GetMapping("orderhistory")
//	public List<ProductDTO> orderhistory(HttpServletRequest request) {
////		User user = (User)request.getSession().getAttribute("user");
////		return profileService.myProducts(user);
//		Long id = (Long)request.getSession().getAttribute("id");
//		return profileService.orderHistory(id);
//	}
	
	public void sendMail(Product prod) throws MessagingException {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "Hey " + prod.getOwner().getFirstName()
				+ "<br>From RentKaro ---> Product return request generated for your product : "+prod.getProductName()
				+ "<br>Your OTP/Verification code is : <br><h1>"+prod.getOtp()
				+ "</h1><br>If you did not request this code, ignore this e-mail.";
		helper.setText(htmlMsg, true);
		helper.setTo(prod.getOwner().getUserEmail());
		helper.setSubject("Action required: Product Return E-mail varification");
		helper.setFrom("bandalshree@gmail.com");
		mailSender.send(mimeMessage);
	}
	
	@GetMapping("returnproductrequest")
	public void returnProductRequest(HttpServletRequest request) throws MessagingException 
	{
		Long id = (Long)request.getSession().getAttribute("id");
		Product product = profileService.returnProductRequest(id);
		sendMail(product);
	}
	
	@DeleteMapping("returnproducts")
	public String returnProduct(@RequestBody ReturnProdDTO prod,HttpServletRequest request) throws MessagingException {
//		User user = (User)request.getSession().getAttribute("user");
//		return profileService.myProducts(user);
		Long id = (Long)request.getSession().getAttribute("id");
		return profileService.returnProduct(id,prod);
	}
}
