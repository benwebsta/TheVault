package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Bank;
import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;
import com.thevault.dao.MiscellaneousDao;
import com.thevault.dao.MiscellaneousDaoImpl;

@Component
public class MiscellaneousService {
	MiscellaneousDao miscellaneousDao = new MiscellaneousDaoImpl();
	BankDao bankDao = new BankDaoImpl();
	
	public List<Miscellaneous> getMiscellaneousesByUser(User user){
		System.out.println("in getMiscellaneousesByUser service");
		System.out.println("for user: " + user);
		return miscellaneousDao.getMiscellaneousesByUser(user);
	}
	public Miscellaneous createMiscellaneous(Miscellaneous miscellaneous){
		System.out.println("in createMiscellaneous service");
		System.out.println("creating miscellaneous: " + miscellaneous);
		Bank bank = new Bank(0, miscellaneous.getBalance(), miscellaneous.getMiscellaneousDate(), miscellaneous.getUser());
		bankDao.createBank(bank);
		return miscellaneousDao.createMiscellaneous(miscellaneous);
	}
	public boolean deleteMiscellaneous(Miscellaneous miscellaneous){
		System.out.println("in deleteMiscellaneous service");
		System.out.println("deleting miscellaneous: \n" + miscellaneous);
		return miscellaneousDao.deleteMiscellaneous(miscellaneous);
	}
	public Miscellaneous getMiscellaneousById(int id){
		System.out.println("in getMiscellaneousById service");
		System.out.println("id: " + id);
		return miscellaneousDao.getMiscellaneousById(id);
	}
}
