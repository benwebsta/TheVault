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
@Table(name = "INCOME")
public class Income {
	
	@Id
	@Column(name="INCOME_ID")
	@SequenceGenerator(name="INCOME_SEQ", sequenceName="INCOME_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="INCOME_SEQ")
	@Qualifier("incomeId")
	private int incomeId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private int amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="INCOME_DATE")
	@Qualifier("incomeDate")
	private Date incomeDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;

	public Income(){}
	
	public Income(int incomeId, int amount, String description, Date incomeDate, User user) {
		super();
		this.incomeId = incomeId;
		this.amount = amount;
		this.description = description;
		this.incomeDate = incomeDate;
		this.user = user;
	}

	public int getIncomeId() {
		return incomeId;
	}

	public void setIncomeId(int incomeId) {
		this.incomeId = incomeId;
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

	public Date getIncomeDate() {
		return incomeDate;
	}

	public void setIncomeDate(Date incomeDate) {
		this.incomeDate = incomeDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Income [incomeId=" + incomeId + ", amount=" + amount + ", description=" + description + ", incomeDate="
				+ incomeDate + ", user=" + user + "]";
	}

}




