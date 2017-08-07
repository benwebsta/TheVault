package com.thevault.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.thevault.beans.Entertainment;
import com.thevault.beans.User;
import com.thevault.dao.EntertainmentDao;
import com.thevault.dao.EntertainmentDaoImpl;

@Component
public class EntertainmentService {
	EntertainmentDao entertainmentDao = new EntertainmentDaoImpl();
	
	public List<Entertainment> getEntertainmentsByUser(User user){
		System.out.println("in getEntertainmentsByUser service");
		System.out.println("for user: " + user);
		return entertainmentDao.getEntertainmentsByUser(user);
	}
	public Entertainment createEntertainment(Entertainment entertainment){
		System.out.println("in createEntertainment service");
		System.out.println("creating entertainment: " + entertainment);
		return entertainmentDao.createEntertainment(entertainment);
	}
}
