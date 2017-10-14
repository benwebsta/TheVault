package com.thevault.web;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.thevault.beans.Income;
import com.thevault.beans.User;
import com.thevault.service.IncomeService;

@RestController
public class IncomeRestController {

	@Autowired
	private IncomeService incomeService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewIncome")
	public @ResponseBody Income createNewIncome_JSON(@RequestBody String newIncomeJSON){
		System.out.println("POST income rest controller hit");
		System.out.println("JSON: " + newIncomeJSON);
		
		Gson gson = new Gson();
		Income newIncome = gson.fromJson(newIncomeJSON, Income.class);
		
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(newIncomeJSON).getAsJsonObject();
		String valueFromClient = obj.get("date").getAsString();
		java.sql.Date date = java.sql.Date.valueOf(valueFromClient);
		//String formatted = new SimpleDateFormat("yyyy-MM-dd").format(date);
		//java.sql.Date formattedDate = new java.sql.Date(formatted);
		System.out.println(date);
		
		/*System.out.println("Test income: --------" + newIncome.toString());
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());*/
		newIncome.setIncomeDate(date);
		
		System.out.println("NEW INCOME: " + newIncome);
		Income income = incomeService.createIncome(newIncome);
		System.out.println(income);
		return income;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllIncomes")
	public @ResponseBody List<Income> getAllIncomes_JSON(@RequestBody String userJSON){
		System.out.println("POST get incomes rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<Income> incomes = incomeService.getIncomesByUser(user);
		System.out.println(incomes);
		return incomes;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteIncome")
	public @ResponseBody boolean deleteIncome_JSON(@RequestBody String incomeJSON){
		System.out.println("POST delete income rest controller hit");
		System.out.println("JSON: " + incomeJSON);
		
		Gson gson = new Gson();
		Income income = gson.fromJson(incomeJSON, Income.class);		
		
		System.out.println("income: " + income);
		boolean result = incomeService.deleteIncome(income);
		System.out.println(result);
		return result;
	}
	
}
