package com.thevault.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Automobile;
import com.thevault.beans.Entertainment;
import com.thevault.beans.Food;
import com.thevault.beans.HealthAndFitness;
import com.thevault.beans.Income;
import com.thevault.beans.Miscellaneous;
import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.dao.AutomobileDao;
import com.thevault.dao.AutomobileDaoImpl;
import com.thevault.dao.EntertainmentDao;
import com.thevault.dao.EntertainmentDaoImpl;
import com.thevault.dao.FoodDao;
import com.thevault.dao.FoodDaoImpl;
import com.thevault.dao.HealthAndFitnessDao;
import com.thevault.dao.HealthAndFitnessDaoImpl;
import com.thevault.dao.IncomeDao;
import com.thevault.dao.IncomeDaoImpl;
import com.thevault.dao.MiscellaneousDao;
import com.thevault.dao.MiscellaneousDaoImpl;
import com.thevault.dao.RentAndUtilityDao;
import com.thevault.dao.RentAndUtilityDaoImpl;

@Component
public class SummaryService {
	AutomobileDao automobileDao = new AutomobileDaoImpl();
	EntertainmentDao entertainmentDao = new EntertainmentDaoImpl();
	FoodDao foodDao = new FoodDaoImpl();
	HealthAndFitnessDao healthAndFitnessDao = new HealthAndFitnessDaoImpl();
	IncomeDao incomeDao = new IncomeDaoImpl();
	MiscellaneousDao miscellaneousDao = new MiscellaneousDaoImpl();
	RentAndUtilityDao rentAndUtilityDao = new RentAndUtilityDaoImpl();
	
	public ArrayList<ArrayList<?>> getAllFinances (User user){
		ArrayList<Automobile> automobiles = (ArrayList<Automobile>) automobileDao.getAutomobilesByUser(user);
		ArrayList<Entertainment> entertainments = (ArrayList<Entertainment>) entertainmentDao.getEntertainmentsByUser(user);
		ArrayList<Food> foods = (ArrayList<Food>) foodDao.getFoodsByUser(user);
		ArrayList<HealthAndFitness> healthAndFitnesses = (ArrayList<HealthAndFitness>) healthAndFitnessDao.getHealthAndFitnessesByUser(user);
		ArrayList<Income> incomes = (ArrayList<Income>) incomeDao.getIncomesByUser(user);
		ArrayList<Miscellaneous> miscellaneouses = (ArrayList<Miscellaneous>) miscellaneousDao.getMiscellaneousesByUser(user);
		ArrayList<RentAndUtility> rentAndUtilities = (ArrayList<RentAndUtility>) rentAndUtilityDao.getRentAndUtilitiesByUser(user);
		
		ArrayList<ArrayList<?>> listOfFinances = new ArrayList<ArrayList<?>>();
		listOfFinances.add(automobiles);
		listOfFinances.add(entertainments);
		listOfFinances.add(foods);
		listOfFinances.add(healthAndFitnesses);
		listOfFinances.add(incomes);
		listOfFinances.add(miscellaneouses);
		listOfFinances.add(rentAndUtilities);
		return listOfFinances;
	}
	
}
