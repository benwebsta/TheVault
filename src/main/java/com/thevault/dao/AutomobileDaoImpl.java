package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.Automobile;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class AutomobileDaoImpl implements AutomobileDao{

	public List<Automobile> getAutomobilesByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM Automobile WHERE user= :user");
			query.setParameter("user", user);
			List<Automobile> result = query.list();
			System.out.println("AUTOMOBILES: \n\n" + result);
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

	public Automobile createAutomobile(Automobile automobile) {
		System.out.println("in dao create automobile");
		System.out.println(automobile);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(automobile);
			 sess.saveOrUpdate(automobile);
			 System.out.println("end of tx");
		     tx.commit();
		     return automobile;

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

	public boolean deleteAutomobile(Automobile automobile) {
		System.out.println("in dao delete automobile");
		System.out.println(automobile);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(automobile);
		     automobile.setUser(null);
			 sess.delete(automobile);
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

	public Automobile getAutomobileById(int id) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Automobile result = (Automobile)sess.get(Automobile.class, id);
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
