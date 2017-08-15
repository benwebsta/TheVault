package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Bank;
import com.thevault.beans.User;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;

@Component
public class BankService {
	BankDao bankDao = new BankDaoImpl();
	
	public List<Bank> getBanksByUser(User user){
		System.out.println("in getBanksByUser service");
		System.out.println("user: " + user);
		return bankDao.getBanksByUser(user);
	}
	public Bank createBank(Bank bank){
		System.out.println("in createBank service");
		System.out.println("bank: " + bank);
		return bankDao.createBank(bank);
	}
}
