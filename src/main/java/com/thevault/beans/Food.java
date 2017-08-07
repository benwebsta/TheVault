package com.thevault.beans;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "FOOD")
public class Food {
	
	@Id
	@Column(name="FOOD_ID")
	@SequenceGenerator(name="FOOD_SEQ", sequenceName="FOOD_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FOOD_SEQ")
	@Qualifier("foodId")
	private int foodId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private int amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="FOOD_DATE")
	@Qualifier("foodDate")
	private Date foodDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;

	public Food(){}

	public Food(int foodId, int amount, String description, Date foodDate, User user) {
		super();
		this.foodId = foodId;
		this.amount = amount;
		this.description = description;
		this.foodDate = foodDate;
		this.user = user;
	}

	public int getFoodId() {
		return foodId;
	}

	public void setFoodId(int foodId) {
		this.foodId = foodId;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getFoodDate() {
		return foodDate;
	}

	public void setFoodDate(Date foodDate) {
		this.foodDate = foodDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Food [foodId=" + foodId + ", amount=" + amount + ", description=" + description + ", foodDate="
				+ foodDate + ", user=" + user + "]";
	}

}




