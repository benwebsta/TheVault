package com.thevault.dao;

import java.util.List;

import com.thevault.beans.HealthAndFitness;
import com.thevault.beans.User;

public interface HealthAndFitnessDao {
	public List<HealthAndFitness> getHealthAndFitnessesByUser(User user);
	public HealthAndFitness createHealthAndFitness(HealthAndFitness healthAndFitness);
}

