package com.rentkaro.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.rentkaro.dto.ForgotPassDTO;
import com.rentkaro.dto.UserLogInDTO;
import com.rentkaro.dto.UserSignUpDTO;
import com.rentkaro.pojos.User;
import com.rentkaro.service.ImageHandlingService;
import com.rentkaro.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

	@Autowired
	public UserService userService;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private ImageHandlingService imageService;

	public UserController() {
		System.out.println("user controller bean created");
	}

//	No Need
//	@GetMapping
//	public String test() {
//		return "hi this is demo test to check controller ";
//	}

	public void sendMail(UserSignUpDTO user, String key) throws MessagingException {
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		String htmlMsg = "Hey " + user.getFirstName() + " " + user.getLastName()
				+ "<br>You recently registered for RentKaro. To complete your RentKaro registration, please confirm your account."
				+ "<br>For verification <a href=\"http://localhost:8080/user/verify/" + user.getUserEmail() + "/" + key
				+ "\">click here</h3>";
		helper.setText(htmlMsg, true);
		helper.setTo(user.getUserEmail());
		helper.setSubject("Action required: Confirm your RentKaro account");
		helper.setFrom("bandalshree@gmail.com");
		mailSender.send(mimeMessage);
	}

	public void sendPass(UserSignUpDTO profile) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom("bandalshree@gmail.com");
		msg.setTo(profile.getUserEmail());
		msg.setText("Hi " + profile.getFirstName() + " " + profile.getLastName() + ",\n"
				+ "We're sorry to hear that you're having trouble with logging in to RentKaro."
				+ "\nWe've received a message that you've forgotten your password. "
				+ "\nIf this was you, then your password is " + profile.getUserPassword()
				+ "\nIf you didn't request a login link or password reset, you can ignore this message.\n"
				+ "Only people who know your RentKaro password or see this email can log in to your account.");
		msg.setSubject(profile.getUserEmail() + ", we've made it easy to get back to RentKaro");
		mailSender.send(msg);
	}

	@GetMapping("/forgotpassword/{email}")
	public String forgotPass(@PathVariable String email) {
		try {
			UserSignUpDTO profile = userService.getPass(email);
			sendPass(profile);
			return "";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@GetMapping("/verify/{email}/{key}")
	public String verfyEmail(@PathVariable String email, @PathVariable String key) {
		try {
			userService.validate(email, key);
			return "Verification Successful Please Login";
		} catch (Exception e) {
			return "Please Login";
		}
	}

	@PostMapping("/signin")
	public String addUser(@RequestBody UserSignUpDTO user) throws MessagingException {
		try {
			String authKey = userService.addUser(user);
			sendMail(user, authKey);
		} catch (Exception e) {
			return "user alredy exist";
		}
		return "Login successful please verify email";
	}

	@GetMapping("/islogin")
	public String isLogin(HttpServletRequest request) {
		Long id = (Long) request.getSession().getAttribute("id");
		return id.toString();
	}

	@GetMapping("/logout")
	public String logOut(HttpServletRequest request) {
		request.getSession().invalidate();
		return "Logout successfull";
	}

	@PostMapping
	public String authenticate(@RequestBody UserLogInDTO user, HttpServletRequest request)
			throws JsonProcessingException {
		try {
			User curUser = userService.authenticate(user);
			if (curUser.getAuthKey() == null) {
				request.getSession().setAttribute("id", curUser.getId());
				return "";
			} else {
				return "Verify Email first";
			}
		} catch (Exception e) {
			return "Email and Password does not match";
		}
	}

	@PutMapping("/changepassword") // in future forgot pass
	public String changePassword(@RequestBody ForgotPassDTO user, HttpServletRequest request) {
		Long id = (Long) request.getSession().getAttribute("id");
		return userService.changePassword(user,id);
	}

	@PostMapping(value = "/profileimage", consumes = "multipart/form-data")
	public void uploadImage(@RequestParam String email, @RequestParam MultipartFile image) throws IOException {
		imageService.uploadImage(email, image);
	}

	@GetMapping(value = "/profileimage", produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public byte[] downloadImage(HttpServletRequest request) throws IOException {
		Long id = (Long) request.getSession().getAttribute("id");
		return imageService.serveImage(id);
	}

//	No Need
//	  @GetMapping("/all")
//	  public List<UserSignUpDTO> getUsers() 
//	  { 
//		  return userService.getUsers(); 
//	  }

}
