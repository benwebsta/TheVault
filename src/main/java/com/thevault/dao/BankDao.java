package com.thevault.dao;

import java.util.List;

import com.thevault.beans.Bank;
import com.thevault.beans.User;

public interface BankDao {
	public List<Bank> getBanksByUser(User user);
	public Bank createBank(Bank bank);
	public Bank getMostRecentEntry(User user);
}
