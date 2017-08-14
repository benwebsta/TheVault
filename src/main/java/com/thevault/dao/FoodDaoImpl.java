package com.thevault.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.thevault.beans.Food;
import com.thevault.beans.User;
import com.thevault.config.HibernateUtil;

public class FoodDaoImpl implements FoodDao{

	public List<Food> getFoodsByUser(User user) {
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		try {
			tx = sess.beginTransaction();
			Query query = sess.createQuery("FROM Food WHERE user= :user");
			query.setParameter("user", user);
			List<Food> result = query.list();
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

	public Food createFood(Food food) {
		System.out.println("in dao create food");
		System.out.println(food);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(food);
			 sess.saveOrUpdate(food);
			 System.out.println("end of tx");
		     tx.commit();
		     return food;

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

	public boolean deleteFood(Food food) {
		System.out.println("in dao delete food");
		System.out.println(food);
		Session sess = HibernateUtil.getSession();
		Transaction tx;
		
		 try {
		     tx = sess.beginTransaction();
		     System.out.println(" in tx");
		     System.out.println(food);
		     food.setUser(null);
			 sess.delete(food);
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
