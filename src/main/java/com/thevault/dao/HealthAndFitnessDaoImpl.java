package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.HealthAndFitness;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class HealthAndFitnessDaoImpl implements HealthAndFitnessDao{

	public List<HealthAndFitness> getHealthAndFitnessesByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM HealthAndFitness WHERE user= :user");
			query.setParameter("user", user);
			List<HealthAndFitness> result = query.list();
			System.out.println("INCOMES: \n\n" + result);
			tx.commit();
			if(!result.isEmpty())
				return result;
			else 
				return null;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public HealthAndFitness createHealthAndFitness(HealthAndFitness healthAndFitness) {
		System.out.println("in dao create healthAndFitness");
		System.out.println(healthAndFitness);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(healthAndFitness);
			 sess.saveOrUpdate(healthAndFitness);
			 System.out.println("end of tx");
		     tx.commit();
		     return healthAndFitness;

		 }
		 catch (Exception e) {
			 System.out.println(e);
			 e.printStackTrace();
			 return null;
		 }
		 finally {
		     sess.close();
		 }
	}

}
