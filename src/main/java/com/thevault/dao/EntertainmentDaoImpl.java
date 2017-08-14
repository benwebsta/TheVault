package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.Automobile;
import com.thevault.beans.Entertainment;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class EntertainmentDaoImpl implements EntertainmentDao{

	public List<Entertainment> getEntertainmentsByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM Entertainment WHERE user= :user");
			query.setParameter("user", user);
			List<Entertainment> result = query.list();
			System.out.println("ENTERTAINMENT: \n\n" + result);
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

	public Entertainment createEntertainment(Entertainment entertainment) {
		System.out.println("in dao create entertainment");
		System.out.println(entertainment);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(entertainment);
			 sess.saveOrUpdate(entertainment);
			 System.out.println("end of tx");
		     tx.commit();
		     return entertainment;

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

	public boolean deleteEntertainment(Entertainment entertainment) {
		System.out.println("in dao delete entertainment");
		System.out.println(entertainment);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(entertainment);
		     entertainment.setUser(null);
			 sess.delete(entertainment);
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

	public Entertainment getEntertainmentById(int id) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Entertainment result = (Entertainment)sess.get(Entertainment.class, id);
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
