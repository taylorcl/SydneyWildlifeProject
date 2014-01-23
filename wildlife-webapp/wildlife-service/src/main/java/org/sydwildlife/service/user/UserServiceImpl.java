package org.sydwildlife.service.user;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.sydwildlife.dao.user.UserDAO;
import org.sydwildlife.domain.User;

@Service("userService")
@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
public class UserServiceImpl implements UserService {

	private static Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
	private UserDAO userDAO;
	
	@Inject
	public UserServiceImpl(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	
	@Override
	public User findUserById(Long userId) { 
		return userDAO.load(userId);
	}
			
	@Override
	public List<User> findAllUsers() {
		List<User> validUserList = new ArrayList<User>();
		List<User> userList = userDAO.loadAll();
		if (userList != null){
			for (User user : userList) {
				if (user.valid()){
					validUserList.add(user);
				} else {
					LOG.warn("User entity with Id: " + user.getId() + " is invalid. Skipping...");
				}
			}
		}
		return validUserList;
	}

	@Override
	public User findByLastName(String lastName) {
		return userDAO.findByLastName(lastName);
	}

	@Transactional(readOnly=false)
	@Override
	public void createUser(User user) {
		userDAO.save(user);
		
	}

	@Transactional(readOnly=false)
	@Override
	public void deleteUser(Long userId) {
		if (userId != null){
			User user = userDAO.load(userId);
			userDAO.delete(user);
		}
		
	}

}
