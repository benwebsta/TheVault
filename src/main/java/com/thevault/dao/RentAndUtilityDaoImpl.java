package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.Miscellaneous;
import com.thevault.beans.RentAndUtility;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class RentAndUtilityDaoImpl implements RentAndUtilityDao{

	public List<RentAndUtility> getRentAndUtilitiesByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM RentAndUtility WHERE user= :user");
			query.setParameter("user", user);
			List<RentAndUtility> result = query.list();
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

	public RentAndUtility createRentAndUtility(RentAndUtility rentAndUtility) {
		System.out.println("in dao create rentAndUtility");
		System.out.println(rentAndUtility);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(rentAndUtility);
			 sess.saveOrUpdate(rentAndUtility);
			 System.out.println("end of tx");
		     tx.commit();
		     return rentAndUtility;

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

	public boolean deleteRentAndUtility(RentAndUtility rentAndUtility) {
		System.out.println("in dao delete entertainment");
		System.out.println(rentAndUtility);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(rentAndUtility);
		     rentAndUtility.setUser(null);
			 sess.delete(rentAndUtility);
			 System.out.println("end of tx");
		     tx.commit();
		     return true;

		 }
		 catch (Exception e) {
			 System.out.println(e);
			 e.printStackTrace();
			 return false;
		 }
		 finally {
		     sess.close();
		 }
	}

	public RentAndUtility getRentAndUtilityById(int id) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			RentAndUtility result = (RentAndUtility)sess.get(RentAndUtility.class, id);
			tx.commit();
			if(result != null)
				return result;
			else 
				return null;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
