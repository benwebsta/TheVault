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
import com.thevault.beans.Entertainment;
import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.service.RentAndUtilityService;

@RestController
public class RentAndUtilityRestController {

	@Autowired
	private RentAndUtilityService rentAndUtilityService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewRentAndUtility")
	public @ResponseBody RentAndUtility createNewRentAndUtility_JSON(@RequestBody String newRentAndUtilityJSON){
		System.out.println("POST RentAndUtility rest controller hit");
		System.out.println("JSON: " + newRentAndUtilityJSON);
		
		Gson gson = new Gson();
		RentAndUtility newRentAndUtility = gson.fromJson(newRentAndUtilityJSON, RentAndUtility.class);
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(newRentAndUtilityJSON).getAsJsonObject();
		String valueFromClient = obj.get("date").getAsString();
		java.sql.Date date = java.sql.Date.valueOf(valueFromClient);
		newRentAndUtility.setRentAndUtilityDate(date);
		
		
		System.out.println("NEW RentAndUtility: " + newRentAndUtility);
		RentAndUtility rentAndUtility = rentAndUtilityService.createRentAndUtility(newRentAndUtility);
		System.out.println(rentAndUtility);
		return rentAndUtility;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllRentAndUtilities")
	public @ResponseBody List<RentAndUtility> getAllRentAndUtilitys_JSON(@RequestBody String userJSON){
		System.out.println("POST get RentAndUtilitys rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<RentAndUtility> rentAndUtilities = rentAndUtilityService.getRentAndUtilitiesByUser(user);
		System.out.println(rentAndUtilities);
		return rentAndUtilities;
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteRentAndUtility")
	public @ResponseBody boolean deleteRentAndUtility_JSON(@RequestBody String rentAndUtilityJSON){
		System.out.println("POST delete rentAndUtility rest controller hit");
		System.out.println("JSON: " + rentAndUtilityJSON);
		
		Gson gson = new Gson();
		RentAndUtility rentAndUtility = gson.fromJson(rentAndUtilityJSON, RentAndUtility.class);		
		
		System.out.println("rentAndUtility: " + rentAndUtility);
		boolean result = rentAndUtilityService.deleteRentAndUtility(rentAndUtility);
		System.out.println(result);
		return result;
	}
}
