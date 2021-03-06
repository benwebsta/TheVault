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
@Table(name = "ENTERTAINMENT")
public class Entertainment {
	
	@Id
	@Column(name="ENTERTAINMENT_ID")
	@SequenceGenerator(name="ENTERTAINMENT_SEQ", sequenceName="ENTERTAINMENT_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ENTERTAINMENT_SEQ")
	@Qualifier("entertainmentId")
	private int entertainmentId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private double amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="ENTERTAINMENT_DATE")
	@Qualifier("entertainmentDate")
	private Date entertainmentDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;

	public Entertainment(){}

	public Entertainment(int entertainmentId, int amount, String description, Date entertainmentDate, User user) {
		super();
		this.entertainmentId = entertainmentId;
		this.amount = amount;
		this.description = description;
		this.entertainmentDate = entertainmentDate;
		this.user = user;
	}

	public int getEntertainmentId() {
		return entertainmentId;
	}

	public void setEntertainmentId(int entertainmentId) {
		this.entertainmentId = entertainmentId;
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

	public Date getEntertainmentDate() {
		return entertainmentDate;
	}

	public void setEntertainmentDate(Date entertainmentDate) {
		this.entertainmentDate = entertainmentDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Entertainment [entertainmentId=" + entertainmentId + ", amount=" + amount + ", description="
				+ description + ", entertainmentDate=" + entertainmentDate + ", user=" + user + "]";
	}

}




