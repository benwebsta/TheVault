package com.thevault.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.thevault.beans.Bank;
import com.thevault.beans.User;
import com.thevault.service.BankService;

@RestController
public class BankRestController {

	@Autowired
	private BankService bankService;
	
	@RequestMapping(method=RequestMethod.POST, value="/getAllBanks")
	public @ResponseBody List<Bank> getAllBanks_JSON(@RequestBody String userJSON){
		System.out.println("POST get automobiles rest controller hit");
		System.out.println("JSON: " + userJSON);
		
		Gson gson = new Gson();
		User user = gson.fromJson(userJSON, User.class);		
		
		System.out.println("user: " + user);
		List<Bank> banks = bankService.getBanksByUser(user);
		System.out.println(banks);
		return banks;
	}
}
