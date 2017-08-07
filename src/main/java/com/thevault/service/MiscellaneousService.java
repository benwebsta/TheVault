package com.thevault.service;

import java.util.List;

import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;
import com.thevault.dao.MiscellaneousDao;
import com.thevault.dao.MiscellaneousDaoImpl;

public class MiscellaneousService {
	MiscellaneousDao miscellaneousDao = new MiscellaneousDaoImpl();
	
	public List<Miscellaneous> getMiscellaneousesByUser(User user){
		System.out.println("in getMiscellaneousesByUser service");
		System.out.println("for user: " + user);
		return miscellaneousDao.getMiscellaneousesByUser(user);
	}
	public Miscellaneous createMiscellaneous(Miscellaneous miscellaneous){
		System.out.println("in createMiscellaneous service");
		System.out.println("creating miscellaneous: " + miscellaneous);
		return miscellaneousDao.createMiscellaneous(miscellaneous);
	}
}
