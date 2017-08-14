package com.thevault.web;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thevault.beans.Food;
import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.service.FoodService;

@RestController
public class FoodRestController {

	@Autowired
	private FoodService foodService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewFood")
	public @ResponseBody Food createNewFood_JSON(@RequestBody String newFoodJSON){
		System.out.println("POST income rest controller hit");
		System.out.println("JSON: " + newFoodJSON);
		
		Gson gson = new Gson();
		Food newFood = gson.fromJson(newFoodJSON, Food.class);
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
		newFood.setFoodDate(date);
		
		
		System.out.println("NEW FOOD: " + newFood);
		Food food = foodService.createFood(newFood);
		System.out.println(food);
		return food;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllFoods")
	public @ResponseBody List<Food> getAllFoods_JSON(@RequestBody String userJSON){
		System.out.println("POST get foods rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<Food> foods = foodService.getFoodsByUser(user);
		System.out.println(foods);
		return foods;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteFood")
	public @ResponseBody boolean deleteFood_JSON(@RequestBody String foodJSON){
		System.out.println("POST delete food rest controller hit");
		System.out.println("JSON: " + foodJSON);
		
		Gson gson = new Gson();
		Food food = gson.fromJson(foodJSON, Food.class);		
		
		System.out.println("food: " + food);
		boolean result = foodService.deleteFood(food);
		System.out.println(result);
		return result;
	}
}
