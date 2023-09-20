package com.ServerConfig.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.ServerConfig.entities.Abonnement;
import com.ServerConfig.entities.LogEntry;
import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;

public interface IUserService{

	public Optional<User> findUserById(Long id);
	public User addUser(User u);
	public Abonnement addAbonnement(Abonnement u);
	public User login(String matricule,String password);
	public List<Telephone> AllPhones();
	public List<User> UsersWithAffectation();
	 public Map<String, Integer> countMarqueOccurrences(List<Telephone> phones);
	public List<User> findUsersWithoutAffectation();
	public Telephone AjouterTele(Telephone t);
	public User UpdateUser(User user);
	public Telephone UpdatePhone(Telephone t);
	public Abonnement UpdateAbonnement(Abonnement t);
	public List<Abonnement> abonnements();
	public List<User> users();
	void deleteById(Long u);
	public void deletephoneById(Long u); 
	public  List<Telephone> findTelephoneByUserAffectation();
	public List<User> findUserwithAbonnements();
	public void deleteAbonnementById(Long u);
	public ResponseEntity<User> findByMatriculeAndPassword(String matricule, String password);
	public List<LogEntry> findalllogs();
}
