package com.admin.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ADMIN")

public class AdminEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String password;
	public AdminEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public AdminEntity(String name, String password) {
		super();
		this.name = name;
		this.password = password;
	}
	public AdminEntity(Long id, String name, String password) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	

}
