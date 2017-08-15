package com.thevault.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.thevault.beans.Automobile;
import com.thevault.beans.Bank;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class BankDaoImpl implements BankDao{

	public List<Bank> getBanksByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM Bank WHERE user= :user");
			query.setParameter("user", user);
			List<Bank> result = query.list();
			System.out.println("BANKS: \n\n" + result);
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

	public Bank createBank(Bank bank) {
		System.out.println("in dao create bank");
		System.out.println(bank);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(bank);
			 sess.saveOrUpdate(bank);
			 System.out.println("end of tx");
		     tx.commit();
		     return bank;

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

	public Bank getMostRecentEntry(User user) {
		System.out.println("in dao get most recent bank");
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     Criteria c = sess.createCriteria(Bank.class);
			 c.addOrder(Order.desc("bankId"));
			 c.add(Restrictions.eq("user", user));
			 System.out.println(c.list().get(0));
			 System.out.println("end of tx");
		     tx.commit();
		     return (Bank) c.list().get(0);

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
