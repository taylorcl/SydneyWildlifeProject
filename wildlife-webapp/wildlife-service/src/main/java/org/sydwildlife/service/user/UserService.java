package org.sydwildlife.service.user;

import java.util.List;

import org.sydwildlife.domain.User;

public interface UserService {

	List<User> findAllUsers();
	
	User findUserById(Long userId);
	
	User findByLastName(String lastName);
	
	void createUser(User user);
	
	void deleteUser(Long userId);
}
