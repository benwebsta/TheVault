package com.thevault.dao;

import java.util.List;

import com.thevault.beans.Income;
import com.thevault.beans.User;

public interface IncomeDao {

	public List<Income> getIncomesByUser(User user);
	public Income createIncome(Income income);
}
