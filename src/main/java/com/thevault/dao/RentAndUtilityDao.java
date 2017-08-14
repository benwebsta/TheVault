package com.thevault.dao;

import java.util.List;

import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;

public interface RentAndUtilityDao {
	public List<RentAndUtility> getRentAndUtilitiesByUser (User user);
	public RentAndUtility createRentAndUtility (RentAndUtility rentAndUtility);
	public boolean deleteRentAndUtility(RentAndUtility rentAndUtility);
	public RentAndUtility getRentAndUtilityById(int id);
}
