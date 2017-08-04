package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class UserDaoImpl implements UserDao{
	
	public User getUserByUsername(String username) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM User WHERE username= :username");
			query.setParameter("username", username);
			List<User> result = query.list();
			System.out.println(result);
			tx.commit();
			if(!result.isEmpty())
				return result.get(0);
			else 
				return null;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public User createUser(User user) {
		System.out.println("in dao");
		System.out.println(user);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(user);
			 sess.saveOrUpdate(user);
			 System.out.println("end of tx");
		     tx.commit();
		     return user;

		 }
		 catch (Exception e) {
			 System.out.println(e);
			 e.printStackTrace();
			 return null;
		 }
		 finally {
		     sess.close();
		 }
	}

	public User login(String username, String password) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM User WHERE username= :username and password= :password");
			query.setParameter("username", username);
			query.setParameter("password", password);
			List<User> result = query.list();
			System.out.println("query result: " + result);
			tx.commit();
			if(!result.isEmpty())
				return result.get(0);
			else 
				return null;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
