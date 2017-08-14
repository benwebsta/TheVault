package com.thevault.dao;

import java.util.List;

import com.thevault.beans.Entertainment;
import com.thevault.beans.User;

public interface EntertainmentDao {
	public List<Entertainment> getEntertainmentsByUser(User user);
	public Entertainment createEntertainment(Entertainment entertainment);
	public boolean deleteEntertainment(Entertainment entertainment);
}
