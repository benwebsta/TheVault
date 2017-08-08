package com.thevault.web;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thevault.beans.User;
import com.thevault.service.SummaryService;

@RestController
public class SummaryRestController {
	
	@Autowired
	private SummaryService summaryService;
	
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
}
