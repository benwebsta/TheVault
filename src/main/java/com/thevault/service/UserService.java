package com.thevault.service;

import org.springframework.stereotype.Component;

import com.thevault.beans.User;
import com.thevault.dao.UserDao;
import com.thevault.dao.UserDaoImpl;

@Component
public class UserService {
	UserDao userDao = new UserDaoImpl();
	
	public User getUserByUsername(String username){
		System.out.println("in get user by username service");
		System.out.println("username: " + username);
		return userDao.getUserByUsername(username);
	}
	
	public User createUser(User user){
		System.out.println("in createUser service");
		System.out.println("creating user: " + user);
		return userDao.createUser(user);
	}

	public User login(String username, String password){
		System.out.println("in login service");
		System.out.println("login with username: " + username + " and password: " + password);
		return userDao.login(username, password);
	}
}
