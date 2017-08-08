package com.thevault.dao;

import java.util.List;

import com.thevault.beans.User;

public interface SummaryDao {
	public List<Object> getAllFinances(User user);
}
