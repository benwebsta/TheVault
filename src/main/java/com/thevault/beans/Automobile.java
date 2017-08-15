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
@Table(name = "AUTOMOBILE")
public class Automobile {
	
	@Id
	@Column(name="AUTOMOBILE_ID")
	@SequenceGenerator(name="AUTOMOBILE_SEQ", sequenceName="AUTOMOBILE_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="AUTOMOBILE_SEQ")
	@Qualifier("automobileId")
	private int automobileId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private double amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="AUTOMOBILE_DATE")
	@Qualifier("automobileDate")
	private Date automobileDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(name="BALANCE")
	@Qualifier("balance")
	private double balance;

	public Automobile(){}
	
	public Automobile(int automobileId, int amount, String description, Date automobileDate, User user, double balance) {
		super();
		this.automobileId = automobileId;
		this.amount = amount;
		this.description = description;
		this.automobileDate = automobileDate;
		this.user = user;
		this.balance = balance;
	}

	public int getAutomobileId() {
		return automobileId;
	}

	public void setAutomobileId(int automobileId) {
		this.automobileId = automobileId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getAutomobileDate() {
		return automobileDate;
	}

	public void setAutomobileDate(Date automobileDate) {
		this.automobileDate = automobileDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "Automobile [automobileId=" + automobileId + ", amount=" + amount + ", description=" + description
				+ ", automobileDate=" + automobileDate + ", user=" + user + ", balance=" + balance + "]";
	}

}




