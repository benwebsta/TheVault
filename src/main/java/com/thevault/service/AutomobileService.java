package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Automobile;
import com.thevault.beans.Bank;
import com.thevault.beans.User;
import com.thevault.dao.AutomobileDao;
import com.thevault.dao.AutomobileDaoImpl;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;

@Component
public class AutomobileService {
	AutomobileDao automobileDao = new AutomobileDaoImpl();
	BankDao bankDao = new BankDaoImpl();
	
	public List<Automobile> getAutomobilesByUser(User user){
		System.out.println("in getAutomobilesByUser service");
		System.out.println("for user: " + user);
		return automobileDao.getAutomobilesByUser(user);
	}
	public Automobile createAutomobile(Automobile automobile){
		System.out.println("in createAutomobile service");
		System.out.println("creating automobile: " + automobile);
		Automobile test = automobileDao.createAutomobile(automobile);
		Bank recent = bankDao.getMostRecentEntry(test.getUser());
		System.out.println("most recent: " + recent);
		return test;
	}
	public boolean deleteAutomobile(Automobile automobile){
		System.out.println("in deleteAutomobile service");
		System.out.println("deleting automobile: \n" + automobile);
		return automobileDao.deleteAutomobile(automobile);
	}
	public Automobile getAutomobileById(int id){
		System.out.println("In getAutomobileById service");
		System.out.println("Id: " + id);
		return automobileDao.getAutomobileById(id);
	}
}
