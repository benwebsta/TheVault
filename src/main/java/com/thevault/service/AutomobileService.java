package com.thevault.service;

import java.util.List;

import com.thevault.beans.Automobile;
import com.thevault.beans.User;
import com.thevault.dao.AutomobileDao;
import com.thevault.dao.AutomobileDaoImpl;

public class AutomobileService {
	AutomobileDao automobileDao = new AutomobileDaoImpl();
	
	public List<Automobile> getAutomobilesByUser(User user){
		System.out.println("in getAutomobilesByUser service");
		System.out.println("for user: " + user);
		return automobileDao.getAutomobilesByUser(user);
	}
	public Automobile createAutomobile(Automobile automobile){
		System.out.println("in createAutomobile service");
		System.out.println("creating automobile: " + automobile);
		return automobileDao.createAutomobile(automobile);
	}
}
