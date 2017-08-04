package com.thevault.dao;

import com.thevault.beans.User;

public interface UserDao {

	public User getUserByUsername(String username);
	public User createUser(User user);
	public User login(String username, String password);
}
