package com.rentkaro.service;

import org.springframework.stereotype.Service;

import com.rentkaro.dto.ForgotPassDTO;
import com.rentkaro.dto.UserLogInDTO;
import com.rentkaro.dto.UserSignUpDTO;
import com.rentkaro.pojos.User;

@Service
@org.springframework.transaction.annotation.Transactional
public interface UserService {

	String addUser(UserSignUpDTO obj);

	User authenticate(UserLogInDTO user);

	String changePassword(ForgotPassDTO user,Long id);

	void validate(String email,String key);

//	List<UserSignUpDTO> getUsers();
	
	UserSignUpDTO getPass(String email);

}
