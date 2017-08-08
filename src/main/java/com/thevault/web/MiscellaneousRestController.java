package com.thevault.web;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;
import com.thevault.service.MiscellaneousService;

public class MiscellaneousRestController {

	@Autowired
	private MiscellaneousService miscellaneousService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewMiscellaneous")
	public @ResponseBody Miscellaneous createNewMiscellaneous_JSON(@RequestBody String newMiscellaneousJSON){
		System.out.println("POST Miscellaneous rest controller hit");
		System.out.println("JSON: " + newMiscellaneousJSON);
		
		Gson gson = new Gson();
		Miscellaneous newMiscellaneous = gson.fromJson(newMiscellaneousJSON, Miscellaneous.class);
		java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
		newMiscellaneous.setMiscellaneousDate(date);
		
		
		System.out.println("NEW Miscellaneous: " + newMiscellaneous);
		Miscellaneous miscellaneous = miscellaneousService.createMiscellaneous(newMiscellaneous);
		System.out.println(miscellaneous);
		return miscellaneous;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllMiscellaneouss")
	public @ResponseBody List<Miscellaneous> getAllMiscellaneouss_JSON(@RequestBody String userJSON){
		System.out.println("POST get Miscellaneouss rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<Miscellaneous> miscellaneouses = miscellaneousService.getMiscellaneousesByUser(user);
		System.out.println(miscellaneouses);
		return miscellaneouses;
	}
}
