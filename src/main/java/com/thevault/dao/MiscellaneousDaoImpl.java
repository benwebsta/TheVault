package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.Miscellaneous;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class MiscellaneousDaoImpl implements MiscellaneousDao{

	public List<Miscellaneous> getMiscellaneousesByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM Miscellaneous WHERE user= :user");
			query.setParameter("user", user);
			List<Miscellaneous> result = query.list();
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

	public Miscellaneous createMiscellaneous(Miscellaneous miscellaneous) {
		System.out.println("in dao create miscellaneous");
		System.out.println(miscellaneous);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(miscellaneous);
			 sess.saveOrUpdate(miscellaneous);
			 System.out.println("end of tx");
		     tx.commit();
		     return miscellaneous;

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

	public boolean deleteMiscellaneous(Miscellaneous miscellaneous) {
		System.out.println("in dao delete entertainment");
		System.out.println(miscellaneous);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(miscellaneous);
		     miscellaneous.setUser(null);
			 sess.delete(miscellaneous);
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

}
