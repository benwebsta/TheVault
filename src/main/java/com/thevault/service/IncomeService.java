package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Bank;
import com.thevault.beans.Income;
import com.thevault.beans.User;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;
import com.thevault.dao.IncomeDao;
import com.thevault.dao.IncomeDaoImpl;

@Component
public class IncomeService {
	IncomeDao incomeDao = new IncomeDaoImpl();
	BankDao bankDao = new BankDaoImpl();
	
	public List<Income> getIncomesByUser(User user){
		System.out.println("in getIncomesByUser service");
		System.out.println("for user: " + user);
		return incomeDao.getIncomesByUser(user);
	}
	public Income createIncome(Income income){
		System.out.println("in createIncome service");
		System.out.println("creating income: " + income);
		Bank recentBank = bankDao.getMostRecentEntry(income.getUser());
		Bank bank = new Bank(0, recentBank.getBalance() + income.getAmount(), income.getIncomeDate(), income.getUser());
		bankDao.createBank(bank);
		return incomeDao.createIncome(income);
	}
	
	public boolean deleteIncome(Income income){
		System.out.println("In deleteIncome service");
		System.out.println("deleting income: \n" + income);
		Bank recentBank = bankDao.getMostRecentEntry(income.getUser());
		Bank bank = new Bank(0, recentBank.getBalance() - income.getAmount(), income.getIncomeDate(), income.getUser());
		bankDao.createBank(bank);
		return incomeDao.deleteIncome(income);
	}
	public Income getIncomeById(int id){
		System.out.println("in getIncomeById service");
		System.out.println("id: " + id);
		return incomeDao.getIncomeById(id);
	}
}
