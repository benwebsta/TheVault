package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.Income;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class IncomeDaoImpl implements IncomeDao{

	public List<Income> getIncomesByUser(User user){
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM Income WHERE user= :user");
			query.setParameter("user", user);
			List<Income> result = query.list();
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
	public Income createIncome(Income income){
		System.out.println("in dao create income");
		System.out.println(income);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(income);
			 sess.saveOrUpdate(income);
			 System.out.println("end of tx");
		     tx.commit();
		     return income;

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
	public boolean deleteIncome(Income income) {
		System.out.println("in dao delete income");
		System.out.println(income);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(income);
		     income.setUser(null);
			 sess.delete(income);
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
