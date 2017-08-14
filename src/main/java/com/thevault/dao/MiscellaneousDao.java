package com.thevault.dao;

import java.util.List;

import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;

public interface MiscellaneousDao {
	public List<Miscellaneous> getMiscellaneousesByUser(User user);
	public Miscellaneous createMiscellaneous(Miscellaneous miscellaneous);
	public boolean deleteMiscellaneous(Miscellaneous miscellaneous);
	public Miscellaneous getMiscellaneousById(int id);
}
