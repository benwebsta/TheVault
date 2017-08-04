package com.thevault.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thevault.beans.User;
import com.thevault.service.UserService;


@RestController
public class UserRestController {
	
	@Autowired
	private UserService userService;

	@RequestMapping(method=RequestMethod.POST, value="/createNewUser")
	public @ResponseBody User createNewUser_JSON(@RequestBody String newUserJson){
		System.out.println("POST user rest controller hit");
		System.out.println(newUserJson);

		Gson gson = new Gson();
		User newUser = gson.fromJson(newUserJson, User.class);
		User user = userService.createUser(newUser);
		System.out.println(user);
		return user;
	}
	@RequestMapping(method=RequestMethod.POST, value="/getUserByUsername")
	public @ResponseBody User getUserByUsername_JSON(@RequestBody String newUserJson){
		System.out.println("get user rest controller hit");
		
		Gson gson = new Gson();
		User newUser = gson.fromJson(newUserJson, User.class);
		
		String username = newUser.getUsername();
		
		System.out.println(username);
		User user = userService.getUserByUsername(username);
		System.out.println(user);
		if(user != null)
			return user;
		else 
			return null;
	}
	@RequestMapping(method=RequestMethod.POST, value="/login")
	public @ResponseBody User login_JSON(@RequestBody String newUserJson){
		System.out.println("login rest controller hit");
		
		Gson gson = new Gson();
		User loginUser = gson.fromJson(newUserJson, User.class);
		
		System.out.println(loginUser);
		User user = userService.login(loginUser.getUsername(), loginUser.getPassword());
		
		if(user != null)
			return user;
		else 
			return null;
	}

}
