package com.ServerConfig.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ServerConfig.entities.Abonnement;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long>{

	
	 @Query("SELECT t FROM Abonnement t ")
	 List<Abonnement> findUnaffectedAbonnements();
	 
}
