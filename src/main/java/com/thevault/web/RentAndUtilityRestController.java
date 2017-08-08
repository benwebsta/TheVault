package com.thevault.web;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.service.RentAndUtilityService;

public class RentAndUtilityRestController {

	@Autowired
	private RentAndUtilityService rentAndUtilityService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewRentAndUtility")
	public @ResponseBody RentAndUtility createNewRentAndUtility_JSON(@RequestBody String newRentAndUtilityJSON){
		System.out.println("POST RentAndUtility rest controller hit");
		System.out.println("JSON: " + newRentAndUtilityJSON);
		
		Gson gson = new Gson();
		RentAndUtility newRentAndUtility = gson.fromJson(newRentAndUtilityJSON, RentAndUtility.class);
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
		newRentAndUtility.setRentAndUtilityDate(date);
		
		
		System.out.println("NEW RentAndUtility: " + newRentAndUtility);
		RentAndUtility rentAndUtility = rentAndUtilityService.createRentAndUtility(newRentAndUtility);
		System.out.println(rentAndUtility);
		return rentAndUtility;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllRentAndUtilitys")
	public @ResponseBody List<RentAndUtility> getAllRentAndUtilitys_JSON(@RequestBody String userJSON){
		System.out.println("POST get RentAndUtilitys rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<RentAndUtility> rentAndUtilitys = rentAndUtilityService.getRentAndUtilitysByUser(user);
		System.out.println(rentAndUtilitys);
		return rentAndUtilitys;
	}
}
