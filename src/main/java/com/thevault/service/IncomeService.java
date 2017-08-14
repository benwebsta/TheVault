package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Income;
import com.thevault.beans.User;
import com.thevault.dao.IncomeDao;
import com.thevault.dao.IncomeDaoImpl;

@Component
public class IncomeService {
	IncomeDao incomeDao = new IncomeDaoImpl();
	
	public List<Income> getIncomesByUser(User user){
		System.out.println("in getIncomesByUser service");
		System.out.println("for user: " + user);
		return incomeDao.getIncomesByUser(user);
	}
	public Income createIncome(Income income){
		System.out.println("in createIncome service");
		System.out.println("creating income: " + income);
		return incomeDao.createIncome(income);
	}
	
	public boolean deleteIncome(Income income){
		System.out.println("In deleteIncome service");
		System.out.println("deleting income: \n" + income);
		return incomeDao.deleteIncome(income);
	}
}
