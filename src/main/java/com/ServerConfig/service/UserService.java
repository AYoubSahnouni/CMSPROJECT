package com.ServerConfig.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	
	@Override
	public ResponseEntity<User> findByMatriculeAndPassword(String matricule, String password) {
        User user = ur.findByMatriculeAndPassword(matricule,password);
        
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user); // Return the user if the password matches
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Return 401 Unauthorized status
        }
    }
	
	
	
	@Override
	public Abonnement addAbonnement(Abonnement u) {
		return ar.save(u);
	}
	
	@Override
	public User addUser(User u) {
		
		
		System.out.println(u.getAbonnement()+"==================================");
		
		if(u.getTelephone() == null && u.getAbonnement() == null) {
			u.setActive(false);
			return ur.save(u);
		}
		else {
			
			Telephone t = tr.findById(u.getTelephone().getId()).orElse(null);
			Abonnement a = ar.findById(u.getAbonnement().getId()).orElse(null);
			
			if(t == null && a == null || t==null && a!=null) {
				if(a!=null) {
					u.setAbonnement(a);
				}
				else {
					u.setAbonnement(null);
				}
				u.setTelephone(null);
				u.setActive(false);
				return ur.save(u);
			}
			else {
				u.setTelephone(t);
				t.setUser(u);
				u.setAbonnement(a);
				u.setActive(true);
				return ur.save(u);
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
				if(user.isActive()) {
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
				if(!user.isActive()) {
					listUserWithoutPhone.add(user);
				}
			}
		}
		return listUserWithoutPhone;
	}
	
	
	@Override
	public List<User> findUserwithAbonnements(){
		List<User> uu = new ArrayList<>();
		for (User u : ur.findUnaffectedAbonnements()) {
			if(u.getAbonnement()!= null) {
				uu.add(u);
			}
		}
		return uu;
	}
	
	
	@Override
	public  List<Telephone> findTelephoneByUserAffectation(){
		List<Telephone> t = new ArrayList<>();
		for (Telephone telephone : tr.findUnaffectedTelephones()) {
			if(telephone.getUser() == null || telephone.getUser().isActive()==false) {
				t.add(telephone);
			}
		}
		return t;
	}
	
	
	@Override
	public User UpdateUser(User user) {
		if(user.getTelephone()==null && user.getAbonnement()==null) {
			user.setActive(false);
			user.setAbonnement(null);
			user.setTelephone(null);
			return ur.save(user);
		}
		else {
			Telephone t = tr.findById(user.getTelephone().getId()).orElse(null);
			Abonnement a = ar.findById(user.getAbonnement().getId()).orElse(null);
			if(t == null && a == null || t==null && a!=null || t!=null && a==null)  {
				if(a!=null) {
					user.setAbonnement(a);
				}
				else {
					user.setAbonnement(null);
				}
				if(t==null) {
					user.setTelephone(null);
					user.setActive(false);
				}
				else {
					user.setTelephone(t);
					user.setActive(true);
				}
				user.setMatricule(user.getMatricule());
				user.setNom(user.getNom());
				user.setPrenom(user.getPrenom());
				user.setPoste(user.getPoste());
				user.setAffectation(user.getAffectation());
				user.setNumber(user.getNumber());
				return ur.save(user);
			}
			else{
				user.setTelephone(t);
				user.setMatricule(user.getMatricule());
				user.setNom(user.getNom());
				user.setPrenom(user.getPrenom());
				user.setNumber(user.getNumber());
				user.setPoste(user.getPoste());
				user.setAffectation(user.getAffectation());
				user.setAbonnement(a);
				user.setActive(true);
				return ur.save(user);
			}
		}
	}
	
	public Telephone UpdatePhone(Telephone tele) {
		Telephone t = tr.findById(tele.getId()).orElseThrow();
		t.setName(tele.getName());
		t.setNumero_facture(tele.getNumero_facture());
		t.setNumero_serie(tele.getNumero_serie());
		t.setMarque(tele.getMarque());
		t.setModel(tele.getModel());
		t.setDate_acquisition(tele.getDate_acquisition());
		t.setEtat(tele.getEtat());
		t.setMontant(tele.getMontant());
		return tr.save(t);
	}

	@Override
	public Telephone AjouterTele(Telephone t) {
		return tr.save(t);
	}

	@Override
	public List<Telephone> AllPhones() {
		return tr.findAll();
	}


	@Override
	public List<Abonnement> abonnements() {
		return ar.findAll();
	}


	@Override
	public List<User> users() {
		return ur.findAll();
	}


	@Override
	public Optional<User> findUserById(Long id) {
		return ur.findById(id);
	}

	
	@Override
	public void deleteAbonnementById(Long u) {
		ar.deleteById(u);
	}

	@Override
	public Abonnement UpdateAbonnement(Abonnement t) {
		Abonnement ab = ar.findById(t.getId()).orElseThrow();
		ab.setNom(t.getNom());
		ab.setForfeit(t.getForfeit());
		ab.setMontant(t.getMontant());
		ab.setRemise(t.getRemise());
		return ar.save(ab);
	}

	
	

	
	
	
}
