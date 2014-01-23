package org.sydwildlife.dao.user;

 
import org.sydwildlife.dao.util.GenericDAO;
import org.sydwildlife.domain.User;

public interface UserDAO extends GenericDAO<User> {
	User findByLastName(String lastName);
}
