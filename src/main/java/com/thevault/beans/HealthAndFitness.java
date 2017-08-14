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
@Table(name = "HEALTH_AND_FITNESS")
public class HealthAndFitness {
	
	@Id
	@Column(name="HEALTH_AND_FITNESS_ID")
	@SequenceGenerator(name="HEALTH_AND_FITNESS_SEQ", sequenceName="HEALTH_AND_FITNESS_SEQ")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="HEALTH_AND_FITNESS_SEQ")
	@Qualifier("healthAndFitnessId")
	private int healthAndFitnessId;

	@Column(name="AMOUNT")
	@Qualifier("amount")
	private double amount;
	
	@Column(name="DESCRIPTION")
	@Qualifier("description")
	private String description;
	
	@Column(name="HEALTH_AND_FITNESS_DATE")
	@Qualifier("healthAndFitnessDate")
	private Date healthAndFitnessDate;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="USER_ID")
	private User user;

	public HealthAndFitness(){}

	public HealthAndFitness(int healthAndFitnessId, int amount, String description, Date healthAndFitnessDate,
			User user) {
		super();
		this.healthAndFitnessId = healthAndFitnessId;
		this.amount = amount;
		this.description = description;
		this.healthAndFitnessDate = healthAndFitnessDate;
		this.user = user;
	}

	public int getHealthAndFitnessId() {
		return healthAndFitnessId;
	}

	public void setHealthAndFitnessId(int healthAndFitnessId) {
		this.healthAndFitnessId = healthAndFitnessId;
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

	public Date getHealthAndFitnessDate() {
		return healthAndFitnessDate;
	}

	public void setHealthAndFitnessDate(Date healthAndFitnessDate) {
		this.healthAndFitnessDate = healthAndFitnessDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "HealthAndFitness [healthAndFitnessId=" + healthAndFitnessId + ", amount=" + amount + ", description="
				+ description + ", healthAndFitnessDate=" + healthAndFitnessDate + ", user=" + user + "]";
	}

}




