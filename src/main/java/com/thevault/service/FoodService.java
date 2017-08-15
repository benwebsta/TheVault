package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Bank;
import com.thevault.beans.Food;
import com.thevault.beans.User;
import com.thevault.dao.BankDao;
import com.thevault.dao.BankDaoImpl;
import com.thevault.dao.FoodDao;
import com.thevault.dao.FoodDaoImpl;

@Component
public class FoodService {
	FoodDao foodDao = new FoodDaoImpl();
	BankDao bankDao = new BankDaoImpl();
	
	public List<Food> getFoodsByUser(User user){
		System.out.println("in getFoodsByUser service");
		System.out.println("for user: " + user);
		return foodDao.getFoodsByUser(user);
	}
	public Food createFood(Food food){
		System.out.println("in createFood service");
		System.out.println("creating food: " + food);
		Bank bank = new Bank(0, food.getBalance(), food.getFoodDate(), food.getUser());
		bankDao.createBank(bank);
		return foodDao.createFood(food);
	}
	public boolean deleteFood(Food food){
		System.out.println("in deleteFood service");
		System.out.println("deleting food: \n" + food);
		return foodDao.deleteFood(food);
	}
	public Food getFoodById(int id){
		System.out.println("in getFoodById service");
		System.out.println("id: " + id);
		return foodDao.getFoodById(id);
	}
}
