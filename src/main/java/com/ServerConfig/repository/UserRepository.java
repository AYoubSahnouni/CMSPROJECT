package com.ServerConfig.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

	@Query("SELECT u FROM User u WHERE u.matricule = :matricule AND u.password = :password")
	User findByMatriculeAndPassword(@Param(value = "matricule") String matricule,@Param(value = "password") String password);

	 @Query("SELECT t FROM User t")
	 List<User> findUnaffectedAbonnements();
    
	 
    
}
