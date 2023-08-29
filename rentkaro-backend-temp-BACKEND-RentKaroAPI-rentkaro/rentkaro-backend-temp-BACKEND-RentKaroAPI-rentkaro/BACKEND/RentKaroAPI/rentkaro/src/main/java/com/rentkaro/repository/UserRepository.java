package com.rentkaro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rentkaro.pojos.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserEmailAndUserPassword(String email,String pass);

	Optional<User> findByUserEmailAndAuthKey(String email,String key);

	Optional<User> findByUserEmail(String email);

//	Optional<User> findByUserEmailAndUserPasswordAndAuthKeyIsNull(String userEmail, String userPassword);
}
