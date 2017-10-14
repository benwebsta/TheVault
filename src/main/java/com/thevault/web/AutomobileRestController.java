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
import com.thevault.beans.Automobile;
import com.thevault.beans.Income;
import com.thevault.beans.User;
import com.thevault.service.AutomobileService;

@RestController
public class AutomobileRestController {
	
	@Autowired
	private AutomobileService automobileService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewAutomobile")
	public @ResponseBody Automobile createNewAutomobile_JSON(@RequestBody String newAutomobileJSON){
		System.out.println("POST automobile rest controller hit");
		System.out.println("JSON: " + newAutomobileJSON);
		
		Gson gson = new Gson();
		Automobile newAutomobile = gson.fromJson(newAutomobileJSON, Automobile.class);
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(newAutomobileJSON).getAsJsonObject();
		String valueFromClient = obj.get("date").getAsString();
		java.sql.Date date = java.sql.Date.valueOf(valueFromClient);
		newAutomobile.setAutomobileDate(date);
		
		
		System.out.println("NEW AUTOMOBILE: " + newAutomobile);
		Automobile automobile = automobileService.createAutomobile(newAutomobile);
		System.out.println(automobile);
		return automobile;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllAutomobiles")
	public @ResponseBody List<Automobile> getAllAutomobiles_JSON(@RequestBody String userJSON){
		System.out.println("POST get automobiles rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<Automobile> automobiles = automobileService.getAutomobilesByUser(user);
		System.out.println(automobiles);
		return automobiles;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteAutomobile")
	public @ResponseBody boolean deleteAutomobile_JSON(@RequestBody String automobileJSON){
		System.out.println("POST delete automobile rest controller hit");
		System.out.println("JSON: " + automobileJSON);
		
		Gson gson = new Gson();
		Automobile automobile = gson.fromJson(automobileJSON, Automobile.class);		
		
		System.out.println("automobile: " + automobile);
		boolean result = automobileService.deleteAutomobile(automobile);
		System.out.println(result);
		return result;
	}
}
