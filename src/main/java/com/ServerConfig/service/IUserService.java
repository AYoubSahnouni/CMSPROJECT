package com.ServerConfig.service;

import java.util.List;
import java.util.Optional;

import com.ServerConfig.entities.Abonnement;
import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;

public interface IUserService{

	public Optional<User> findUserById(Long id);
	public User addUser(User u);
	public User login(String matricule,String password);
	public List<Telephone> AllPhones();
	public List<User> UsersWithAffectation();
	public List<User> findUsersWithoutAffectation();
	public String AffecterTele(Long iduser,Long idtel);
	public Telephone AjouterTele(Telephone t);
	public User UpdatePhone(User user);
	public List<Abonnement> abonnements();
	public List<User> users();
	void deleteById(Long u);
	public void deletephoneById(Long u); 
	public  List<Telephone> findTelephoneByUserAffectation();
}
