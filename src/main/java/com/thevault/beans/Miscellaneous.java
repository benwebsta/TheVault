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
@Table(name = "MISCELLANEOUS")
public class Miscellaneous {
	
	@Id
	@Column(name="MISCELLANEOUS_ID")
	@SequenceGenerator(name="MISCELLANEOUS_SEQ", sequenceName="MISCELLANEOUS_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="MISCELLANEOUS_SEQ")
	@Qualifier("miscellaneousId")
	private int miscellaneousId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private double amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="MISCELLANEOUS_DATE")
	@Qualifier("miscellaneousDate")
	private Date miscellaneousDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;

	public Miscellaneous(){}

	public Miscellaneous(int miscellaneousId, int amount, String description, Date miscellaneousDate, User user) {
		super();
		this.miscellaneousId = miscellaneousId;
		this.amount = amount;
		this.description = description;
		this.miscellaneousDate = miscellaneousDate;
		this.user = user;
	}

	public int getMiscellaneousId() {
		return miscellaneousId;
	}

	public void setMiscellaneousId(int miscellaneousId) {
		this.miscellaneousId = miscellaneousId;
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

	public Date getMiscellaneousDate() {
		return miscellaneousDate;
	}

	public void setMiscellaneousDate(Date miscellaneousDate) {
		this.miscellaneousDate = miscellaneousDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Miscellaneous [miscellaneousId=" + miscellaneousId + ", amount=" + amount + ", description="
				+ description + ", miscellaneousDate=" + miscellaneousDate + ", user=" + user + "]";
	}

}




