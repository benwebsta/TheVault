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
@Table(name = "RENT_AND_UTILITY")
public class RentAndUtility {
	
	@Id
	@Column(name="RENT_AND_UTILITY_ID")
	@SequenceGenerator(name="RENT_AND_UTILITY_SEQ", sequenceName="RENT_AND_UTILITY_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="RENT_AND_UTILITY_SEQ")
	@Qualifier("rentAndUtilityId")
	private int rentAndUtilityId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private double amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="RENT_AND_UTILITY_DATE")
	@Qualifier("rentAndUtilityDate")
	private Date rentAndUtilityDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(name="BALANCE")
	@Qualifier("balance")
	private double balance;

	public RentAndUtility(){}

	public RentAndUtility(int rentAndUtilityId, int amount, String description, Date rentAndUtilityDate, User user, double balance) {
		super();
		this.rentAndUtilityId = rentAndUtilityId;
		this.amount = amount;
		this.description = description;
		this.rentAndUtilityDate = rentAndUtilityDate;
		this.user = user;
		this.balance = balance;
	}

	public int getRentAndUtilityId() {
		return rentAndUtilityId;
	}

	public void setRentAndUtilityId(int rentAndUtilityId) {
		this.rentAndUtilityId = rentAndUtilityId;
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

	public Date getRentAndUtilityDate() {
		return rentAndUtilityDate;
	}

	public void setRentAndUtilityDate(Date rentAndUtilityDate) {
		this.rentAndUtilityDate = rentAndUtilityDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getbalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "RentAndUtility [rentAndUtilityId=" + rentAndUtilityId + ", amount=" + amount + ", description="
				+ description + ", rentAndUtilityDate=" + rentAndUtilityDate + ", user=" + user + ", balance=" + balance + "]";
	}

}




