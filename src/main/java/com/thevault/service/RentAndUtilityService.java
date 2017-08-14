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
	
	public List<RentAndUtility> getRentAndUtilitiesByUser(User user){
		System.out.println("in getRentAndUtilitiesByUser service");
		System.out.println("for user: " + user);
		return rentAndUtilityDao.getRentAndUtilitiesByUser(user);
	}
	public RentAndUtility createRentAndUtility(RentAndUtility rentAndUtility){
		System.out.println("in createRentAndUtility service");
		System.out.println("creating rentAndUtility: " + rentAndUtility);
		return rentAndUtilityDao.createRentAndUtility(rentAndUtility);
	}
	public boolean deleteRentAndUtility(RentAndUtility rentAndUtility){
		System.out.println("in deleteRentAndUtility service");
		System.out.println("deleting rentAndUtility: \n" + rentAndUtility);
		return rentAndUtilityDao.deleteRentAndUtility(rentAndUtility);
	}
	public RentAndUtility getRentAndUtilityById(int id){
		System.out.println("in getRentAndUtilityById service");
		System.out.println("id: " + id);
		return rentAndUtilityDao.getRentAndUtilityById(id);
	}
}
