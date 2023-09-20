package com.ServerConfig.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;

public interface TelephoneRepository extends JpaRepository<Telephone, Long>{
	
	 List<Telephone> findAllByUserTelephoneIsNull();
	 List<Telephone> findByName(String marque);
	 
	 List<Telephone> findByUserAffectation(boolean a);
	 
//	 List<Telephone> findByModel(String model)WHERE t.user IS NULL OR t.user.affectation = false;
	 @Query("SELECT t FROM Telephone t ")
	 List<Telephone> findUnaffectedTelephones();
	 
	 
}
