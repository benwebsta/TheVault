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
@Table(name="BANK")
public class Bank {

	@Id
	@Column(name="BANK_ID")
	@SequenceGenerator(name="BANK_SEQ", sequenceName="BANK_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="BANK_SEQ")
	@Qualifier("bankId")
	private int bankId;
	
	@Column(name="BALANCE")
	@Qualifier("balance")
	private double balance;
	
	@Column(name="BANK_DATE")
	@Qualifier("bankDate")
	private Date bankDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;
	
	public Bank(){}

	public Bank(int bankId, double balance, Date bankDate, User user) {
		super();
		this.bankId = bankId;
		this.balance = balance;
		this.bankDate = bankDate;
		this.user = user;
	}

	public int getBankId() {
		return bankId;
	}

	public void setBankId(int bankId) {
		this.bankId = bankId;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public Date getBankDate() {
		return bankDate;
	}

	public void setBankDate(Date bankDate) {
		this.bankDate = bankDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Bank [bankId=" + bankId + ", balance=" + balance + ", bankDate=" + bankDate + ", user=" + user + "]";
	}
	
}
