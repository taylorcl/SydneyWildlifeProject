package org.sydwildlife.dao.user;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.sydwildlife.dao.util.ResourceDAO;
import org.sydwildlife.domain.User;

@Repository
public class UserDAOImpl extends ResourceDAO<User> implements UserDAO{

	@Override
	public User findByLastName(String lastName) {
		Session session = getSession();
		Criteria criteria = session.createCriteria(User.class);

		criteria.add(Restrictions.eq("lastName", lastName));

		User user = (User) criteria.uniqueResult();
		
		return user;
	}
}
