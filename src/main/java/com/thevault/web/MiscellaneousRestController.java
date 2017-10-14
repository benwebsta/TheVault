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
import com.thevault.beans.Food;
import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;
import com.thevault.service.MiscellaneousService;

@RestController
public class MiscellaneousRestController {

	@Autowired
	private MiscellaneousService miscellaneousService;
	
	@RequestMapping(method=RequestMethod.POST, value="/createNewMiscellaneous")
	public @ResponseBody Miscellaneous createNewMiscellaneous_JSON(@RequestBody String newMiscellaneousJSON){
		System.out.println("POST Miscellaneous rest controller hit");
		System.out.println("JSON: " + newMiscellaneousJSON);
		
		Gson gson = new Gson();
		Miscellaneous newMiscellaneous = gson.fromJson(newMiscellaneousJSON, Miscellaneous.class);
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(newMiscellaneousJSON).getAsJsonObject();
		String valueFromClient = obj.get("date").getAsString();
		java.sql.Date date = java.sql.Date.valueOf(valueFromClient);
		newMiscellaneous.setMiscellaneousDate(date);
		
		
		System.out.println("NEW Miscellaneous: " + newMiscellaneous);
		Miscellaneous miscellaneous = miscellaneousService.createMiscellaneous(newMiscellaneous);
		System.out.println(miscellaneous);
		return miscellaneous;
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllMiscellaneouses")
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
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteMiscellaneous")
	public @ResponseBody boolean deleteMiscellaneous_JSON(@RequestBody String miscellaneousJSON){
		System.out.println("POST delete miscellaneous rest controller hit");
		System.out.println("JSON: " + miscellaneousJSON);
		
		Gson gson = new Gson();
		Miscellaneous miscellaneous = gson.fromJson(miscellaneousJSON, Miscellaneous.class);		
		
		System.out.println("miscellaneous: " + miscellaneous);
		boolean result = miscellaneousService.deleteMiscellaneous(miscellaneous);
		System.out.println(result);
		return result;
	}
}
