package com.thevault.dao;

import java.util.List;

import com.thevault.beans.Automobile;
import com.thevault.beans.User;

public interface AutomobileDao {
	public List<Automobile> getAutomobilesByUser(User user);
	public Automobile createAutomobile(Automobile automobile);
	public boolean deleteAutomobile(Automobile automobile);
}
