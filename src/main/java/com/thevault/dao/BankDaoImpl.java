package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

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

}
