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
import com.thevault.beans.Entertainment;
import com.thevault.beans.User;
import com.thevault.service.EntertainmentService;

@RestController
public class EntertainmentRestController {

	@Autowired
	private EntertainmentService entertainmentService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewEntertainment")
	public @ResponseBody Entertainment createNewEntertainment_JSON(@RequestBody String newEntertainmentJSON){
		System.out.println("POST entertainment rest controller hit");
		System.out.println("JSON: " + newEntertainmentJSON);
		
		Gson gson = new Gson();
		Entertainment newEntertainment = gson.fromJson(newEntertainmentJSON, Entertainment.class);
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
		newEntertainment.setEntertainmentDate(date);
		
		
		System.out.println("NEW ENTERTAINMENT: " + newEntertainment);
		Entertainment entertainment = entertainmentService.createEntertainment(newEntertainment);
		System.out.println(entertainment);
		return entertainment;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllEntertainments")
	public @ResponseBody List<Entertainment> getAllEntertainments_JSON(@RequestBody String userJSON){
		System.out.println("POST get entertainments rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<Entertainment> entertainments = entertainmentService.getEntertainmentsByUser(user);
		System.out.println(entertainments);
		return entertainments;
	}

}
