package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Bank;
import com.thevault.beans.Entertainment;
import com.thevault.beans.User;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;
import com.thevault.dao.EntertainmentDao;
import com.thevault.dao.EntertainmentDaoImpl;

@Component
public class EntertainmentService {
	EntertainmentDao entertainmentDao = new EntertainmentDaoImpl();
	BankDao bankDao = new BankDaoImpl();
	
	public List<Entertainment> getEntertainmentsByUser(User user){
		System.out.println("in getEntertainmentsByUser service");
		System.out.println("for user: " + user);
		return entertainmentDao.getEntertainmentsByUser(user);
	}
	public Entertainment createEntertainment(Entertainment entertainment){
		System.out.println("in createEntertainment service");
		System.out.println("creating entertainment: " + entertainment);
		Bank bank = new Bank(0, entertainment.getBalance(), entertainment.getEntertainmentDate(), entertainment.getUser());
		bankDao.createBank(bank);
		return entertainmentDao.createEntertainment(entertainment);
	}
	public boolean deleteEntertainment(Entertainment entertainment){
		System.out.println("in deleteEntertainment service");
		System.out.println("deleting entertainment: \n" + entertainment);
		return entertainmentDao.deleteEntertainment(entertainment);
	}
	public Entertainment getEntertainmentById(int id){
		System.out.println("in getEntertainmentById service");
		System.out.println("id: " + id);
		return entertainmentDao.getEntertainmentById(id);
	}
}
