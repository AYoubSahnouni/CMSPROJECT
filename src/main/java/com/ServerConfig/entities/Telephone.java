package com.ServerConfig.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Telephone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String Marque;
	private String Model;
	private String numero_serie;
	private String acquisition;
	private String etat;
	private String motif;
	private String commantaire;

	private int montant;
	private int numero_facture;
	private LocalDate date_acquisition;
	@JsonBackReference	
    @OneToOne(mappedBy = "telephone")
    private User user;
	@Override
	public String toString() {
	    return "Telephone [id=" + id + ", name=" + name + ", Marque=" + Marque + ", Model=" + Model + ", numero_serie="
	            + numero_serie + ", etat=" + etat + ", motif=" + motif + ", commantaire=" + commantaire + ", montant="
	            + montant + ", numero_facture=" + numero_facture + ", date_acquisition=" + date_acquisition + "]";
	}

}
