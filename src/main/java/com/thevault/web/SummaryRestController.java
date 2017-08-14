package com.thevault.web;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.thevault.beans.Automobile;
import com.thevault.beans.Entertainment;
import com.thevault.beans.Food;
import com.thevault.beans.HealthAndFitness;
import com.thevault.beans.Income;
import com.thevault.beans.Miscellaneous;
import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.service.AutomobileService;
import com.thevault.service.EntertainmentService;
import com.thevault.service.FoodService;
import com.thevault.service.HealthAndFitnessService;
import com.thevault.service.IncomeService;
import com.thevault.service.MiscellaneousService;
import com.thevault.service.RentAndUtilityService;
import com.thevault.service.SummaryService;

@RestController
public class SummaryRestController {
	
	@Autowired
	private SummaryService summaryService;
	@Autowired
	private AutomobileService automobileService;
	@Autowired
	private EntertainmentService entertainmentService;
	@Autowired
	private FoodService foodService;
	@Autowired
	private HealthAndFitnessService healthAndFitnessService;
	@Autowired
	private IncomeService incomeService;
	@Autowired
	private MiscellaneousService miscellaneousService;
	@Autowired
	private RentAndUtilityService rentAndUtilityService;
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllFinances")
	public @ResponseBody ArrayList<ArrayList<?>> getAllFinances_JSON(@RequestBody String userJSON){
		System.out.println("in summary REST /getAllFinances endpoint");
		System.out.println("USER: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);	
		
		
		ArrayList<ArrayList<?>> listOfFinances = summaryService.getAllFinances(user);
		System.out.println("LIST OF FINANCES: \n\n" + listOfFinances);
		return listOfFinances;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteSummary")
	public @ResponseBody boolean deleteSummary_JSON(@RequestBody String summaryJSON){
		System.out.println("POST delete summary rest controller hit");
		System.out.println("JSON: " + summaryJSON);
		
		JsonElement jelement = new JsonParser().parse(summaryJSON);
		System.out.println(jelement);	
		JsonObject  jobject = jelement.getAsJsonObject();
		System.out.println(jobject);
		JsonPrimitive tempObject = jobject.getAsJsonPrimitive("amount");
		String amount = tempObject.getAsString();
		tempObject = jobject.getAsJsonPrimitive("group");
		String group = tempObject.getAsString();
		tempObject = jobject.getAsJsonPrimitive("description");
		String description = tempObject.getAsString();
		tempObject = jobject.getAsJsonPrimitive("date");
		String date = tempObject.getAsString();
		tempObject = jobject.getAsJsonPrimitive("id");
		String tempId = tempObject.getAsString();
		int id = Integer.parseInt(tempId);
		
		System.out.println("amount: " + amount);
		System.out.println("group: " + group);
		System.out.println("description: " + description);
		System.out.println("date: " + date);
		System.out.println("id: " + id);
		if(group.equals("Automobile")){
			Automobile automobile = automobileService.getAutomobileById(id);
			System.out.println("deleting: " + automobile);
		}
		else if(group.equals("Entertainment")){
			Entertainment entertainment = entertainmentService.getEntertainmentById(id);
			System.out.println("deleting: " + entertainment);
		}
		else if(group.equals("Food")){
			Food food = foodService.getFoodById(id);
			System.out.println("deleting: " + food);
		}
		else if(group.equals("HealthAndFitness")){
			HealthAndFitness healthAndFitness = healthAndFitnessService.getHealthAndFitnessById(id);
			System.out.println("deleting: " + healthAndFitness);
		}
		else if(group.equals("Income")){
			Income income = incomeService.getIncomeById(id);
			System.out.println("deleting: " + income);
		}
		else if(group.equals("Miscellaneous")){
			Miscellaneous miscellaneous = miscellaneousService.getMiscellaneousById(id);
			System.out.println("deleting: " + miscellaneous);
		}
		else if(group.equals("RentAndUtility")){
			RentAndUtility rentAndUtility = rentAndUtilityService.getRentAndUtilityById(id);
			System.out.println("deleting: " + rentAndUtility);
		}
		/*System.out.println("food: " + food);
		boolean result = summaryJSON.deleteFood(food);
		System.out.println(result);*/
		return false;
	}
}
