package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Bank;
import com.thevault.beans.HealthAndFitness;
import com.thevault.beans.User;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;
import com.thevault.dao.HealthAndFitnessDao;
import com.thevault.dao.HealthAndFitnessDaoImpl;

@Component
public class HealthAndFitnessService {
	HealthAndFitnessDao healthAndFitnessDao = new HealthAndFitnessDaoImpl();
	BankDao bankDao = new BankDaoImpl();
	
	public List<HealthAndFitness> getHealthAndFitnessesByUser(User user){
		System.out.println("in getHealthAndFitnessesByUser service");
		System.out.println("for user: " + user);
		return healthAndFitnessDao.getHealthAndFitnessesByUser(user);
	}
	public HealthAndFitness createHealthAndFitness(HealthAndFitness healthAndFitness){
		System.out.println("in createHealthAndFitness service");
		System.out.println("creating healthAndFitness: " + healthAndFitness);
		Bank recentBank = bankDao.getMostRecentEntry(healthAndFitness.getUser());
		Bank bank = new Bank(0, recentBank.getBalance() - healthAndFitness.getAmount(), healthAndFitness.getHealthAndFitnessDate(), healthAndFitness.getUser());
		bankDao.createBank(bank);
		return healthAndFitnessDao.createHealthAndFitness(healthAndFitness);
	}
	public boolean deleteHealthAndFitness(HealthAndFitness healthAndFitness){
		System.out.println("in deleteHealthAndFitness service");
		System.out.println("deleting healthAndFitness: \n" + healthAndFitness);
		Bank recentBank = bankDao.getMostRecentEntry(healthAndFitness.getUser());
		Bank bank = new Bank(0, recentBank.getBalance() + healthAndFitness.getAmount(), healthAndFitness.getHealthAndFitnessDate(), healthAndFitness.getUser());
		bankDao.createBank(bank);
		return healthAndFitnessDao.deleteHealthAndFitness(healthAndFitness);
	}
	public HealthAndFitness getHealthAndFitnessById(int id){
		System.out.println("in getHealthAndFitnessById service");
		System.out.println("id: " + id);
		return healthAndFitnessDao.getHealthAndFitnessById(id);
	}
}
