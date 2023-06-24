package com.ServerConfig.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ServerConfig.entities.Abonnement;
import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;
import com.ServerConfig.repository.AbonnementRepository;
import com.ServerConfig.repository.TelephoneRepository;
import com.ServerConfig.repository.UserRepository;

@Service
public class UserService implements IUserService{

	@Autowired
	UserRepository ur;
	@Autowired
	TelephoneRepository tr;
	@Autowired
	AbonnementRepository ar;
	
	public User addUser(User u) {
		
		if(u.getTelephone() == null) {
			u.setAffectation(false);
			return ur.save(u);
		}
		else {
			
			Telephone t = tr.findById(u.getTelephone().getId()).orElse(null);
			if(t.getUser() == null ) {
				u.setTelephone(t);
				t.setUser(u);
				u.setAffectation(true);
				return ur.save(u);
			}
			else {
				return null;
			}
		}
	}
		
	@Override
	public void deleteById(Long u) {
		ur.deleteById(u);
	}
	
	@Override
	public void deletephoneById(Long u) {
		tr.deleteById(u);
	}
	
	@Override
	public User login(String matricule,String password) {
		return ur.findByMatriculeAndPassword(matricule,password);
	}

	@Override
	public List<User> UsersWithAffectation() {
		List<User> listUsers = new ArrayList<User>();
		for (User user : ur.findAll()) {
			if(user.getPoste()!="Stagiaire") {
				if(user.isAffectation()) {
					listUsers.add(user);
				}
			}
		}
		return listUsers;
	}

	@Override
	public List<User> findUsersWithoutAffectation() {
		List<User> listUserWithoutPhone = new ArrayList<User>();
		for (User user : ur.findAll()) {
			if(user.getPoste()!="Stagiaire") {
				if(!user.isAffectation()) {
					listUserWithoutPhone.add(user);
				}
			}
		}
		return listUserWithoutPhone;
	}

	
	public  List<Telephone> findTelephoneByUserAffectation(){
		List<Telephone> t = new ArrayList<>();
		for (Telephone telephone : tr.findUnaffectedTelephones()) {
			if(telephone.getUser() == null || telephone.getUser().isAffectation()==false) {
				t.add(telephone);
			}
		}
		return t;
	}
	
	

	
	
	
	
	@Override
	public User UpdatePhone(User user) {
		User u = ur.findById(user.getId()).orElseThrow();
		Telephone t = tr.findById(u.getTelephone().getId()).orElseThrow();
		if(u!=null && t!=null || u!=null && t==null) {
			if(user.getTelephone() == null) {
				user.setAffectation(false);
			}else {
				u.setAffectation(true);
			}
			u.setTelephone(user.getTelephone());
			u.setMatricule(user.getMatricule());
			u.setNom(user.getNom());
			u.setPrenom(user.getPrenom());
			u.setPoste(user.getPoste());
			u.setSiege(user.getSiege());
			return ur.save(u);
		}
		return null;
	}

	@Override
	public Telephone AjouterTele(Telephone t) {
		return tr.save(t);
	}

	@Override
	public List<Telephone> AllPhones() {
		return tr.findAll();
	}

	/*
	 * public String Renouvellement(long idu,long idt) { User u =
	 * ur.findById(idu).orElseThrow(); Telephone t = tr.findById(idt).orElseThrow();
	 * if(u.getUserTelephone().getTelephone().getEtat()=="Ecran Cassé" ||
	 * u.getUserTelephone().getTelephone().getEtat()=="Rayé") {
	 * tr.delete(u.getUserTelephone().getTelephone());
	 * u.getUserTelephone().setTelephone(t); t.getUserTelephone().setUser(u); return
	 * "Telephone Renouveller"; } return "Telephone neuf"; }
	 */

	@Override
	public List<Abonnement> abonnements() {
		return ar.findAll();
	}


	@Override
	public List<User> users() {
		return ur.findAll();
	}

	@Override
	public String AffecterTele(Long iduser, Long idtel) {
		// TODO Auto-generated method stub
		return null;
	}




	@Override
	public Optional<User> findUserById(Long id) {
		return ur.findById(id);
	}



	
	
	
}
