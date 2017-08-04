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
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
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
	
}
