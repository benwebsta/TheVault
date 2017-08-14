package com.thevault.dao;

import java.util.List;

import com.thevault.beans.Food;
import com.thevault.beans.User;

public interface FoodDao {
	public List<Food> getFoodsByUser(User user);
	public Food createFood(Food food);
	public boolean deleteFood(Food food);
	public Food getFoodById(int id);
}
