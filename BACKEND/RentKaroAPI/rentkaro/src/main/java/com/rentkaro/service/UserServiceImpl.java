package com.rentkaro.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentkaro.dto.UserSignUpDTO;
import com.rentkaro.pojos.User;
import com.rentkaro.pojos.UserAddress;
import com.rentkaro.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	public UserRepository userRepo;
	@Autowired
	public ModelMapper modelMap;

	@Override
	public User addUser(UserSignUpDTO obj) {
		User userObj = modelMap.map(obj, User.class);
		UserAddress userAddress = modelMap.map(obj, UserAddress.class);
		userObj.addUserAddress(userAddress);
		return userRepo.save(userObj);
	}

	@Override
	public List<User> getUsers() {
		return userRepo.findAll();
	}

}
