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
import com.thevault.beans.HealthAndFitness;
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
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
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
}
