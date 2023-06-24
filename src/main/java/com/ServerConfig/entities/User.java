package com.ServerConfig.entities;




import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String matricule;
	private String nom;
	private String prenom;
	private String poste;
	private String siege;
	private int number;
	private String password;
	private boolean affectation;		
	@JsonManagedReference
	@OneToOne
    @JoinTable(name = "user_telephone", 
               joinColumns = @JoinColumn(name = "user_id"), 
               inverseJoinColumns = @JoinColumn(name = "telephone_id"))
    private Telephone telephone;
	@JsonBackReference	
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "user")
	private Abonnement abonnement;
	
	public User(String matricule, String password) {
		super();
		this.matricule = matricule;
		this.password = password;
	}

	
}		
