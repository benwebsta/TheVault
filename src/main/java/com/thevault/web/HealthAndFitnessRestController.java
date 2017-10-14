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
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.thevault.beans.HealthAndFitness;
import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;
import com.thevault.service.HealthAndFitnessService;

@RestController
public class HealthAndFitnessRestController {

	@Autowired
	private HealthAndFitnessService healthAndFitnessService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewHealthAndFitness")
	public @ResponseBody HealthAndFitness createNewHealthAndFitness_JSON(@RequestBody String newHealthAndFitnessJSON){
		System.out.println("POST HealthAndFitness rest controller hit");
		System.out.println("JSON: " + newHealthAndFitnessJSON);
		
		Gson gson = new Gson();
		HealthAndFitness newHealthAndFitness = gson.fromJson(newHealthAndFitnessJSON, HealthAndFitness.class);
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(newHealthAndFitnessJSON).getAsJsonObject();
		String valueFromClient = obj.get("date").getAsString();
		java.sql.Date date = java.sql.Date.valueOf(valueFromClient);
		newHealthAndFitness.setHealthAndFitnessDate(date);
		
		
		System.out.println("NEW HEALTHANDFITNESS: " + newHealthAndFitness);
		HealthAndFitness healthAndFitness = healthAndFitnessService.createHealthAndFitness(newHealthAndFitness);
		System.out.println(healthAndFitness);
		return healthAndFitness;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllHealthAndFitnesses")
	public @ResponseBody List<HealthAndFitness> getAllHealthAndFitnesses_JSON(@RequestBody String userJSON){
		System.out.println("POST get foods rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<HealthAndFitness> healthAndFitnesses = healthAndFitnessService.getHealthAndFitnessesByUser(user);
		System.out.println(healthAndFitnesses);
		return healthAndFitnesses;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteHealthAndFitness")
	public @ResponseBody boolean deleteHealthAndFitness_JSON(@RequestBody String healthAndFitnessJSON){
		System.out.println("POST delete healthAndFitness rest controller hit");
		System.out.println("JSON: " + healthAndFitnessJSON);
		
		Gson gson = new Gson();
		HealthAndFitness healthAndFitness = gson.fromJson(healthAndFitnessJSON, HealthAndFitness.class);		
		
		System.out.println("healthAndFitness: " + healthAndFitness);
		boolean result = healthAndFitnessService.deleteHealthAndFitness(healthAndFitness);
		System.out.println(result);
		return result;
	}
}
