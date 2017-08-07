package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.dao.RentAndUtilityDao;
import com.thevault.dao.RentAndUtilityDaoImpl;

@Component
public class RentAndUtilityService {
	RentAndUtilityDao rentAndUtilityDao = new RentAndUtilityDaoImpl();
	
	public List<RentAndUtility> getRentAndUtilitysByUser(User user){
		System.out.println("in getRentAndUtilitysByUser service");
		System.out.println("for user: " + user);
		return rentAndUtilityDao.getRentAndUtilitysByUser(user);
	}
	public RentAndUtility createIncome(RentAndUtility rentAndUtility){
		System.out.println("in createRentAndUtility service");
		System.out.println("creating rentAndUtility: " + rentAndUtility);
		return rentAndUtilityDao.createRentAndUtility(rentAndUtility);
	}
}
