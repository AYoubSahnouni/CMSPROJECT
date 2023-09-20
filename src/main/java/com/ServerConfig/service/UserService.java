package com.ServerConfig.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ServerConfig.entities.Abonnement;
import com.ServerConfig.entities.LogEntry;
import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;
import com.ServerConfig.repository.AbonnementRepository;
import com.ServerConfig.repository.TelephoneRepository;
import com.ServerConfig.repository.UserRepository;
import com.ServerConfig.repository.logentryRepo;

@Service
public class UserService implements IUserService{

	@Autowired
	UserRepository ur;
	@Autowired
	TelephoneRepository tr;
	@Autowired
	AbonnementRepository ar;
	@Autowired
	logentryRepo log;
	
	
	@Override
	public ResponseEntity<User> findByMatriculeAndPassword(String matricule, String password) {
        User user = ur.findByMatriculeAndPassword(matricule,password);
        
        if (user != null && user.getPassword().equals(password)) {
        	LogEntry logentry = new LogEntry();
        	logentry.setMethode("get");
        	logentry.setEntity("user");
        	logentry.setMessage("Connexion : "+user.getNom());
        	logentry.setDatetime(LocalDateTime.now());
        	log.save(logentry);
            return ResponseEntity.ok(user); // Return the user if the password matches
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Return 401 Unauthorized status
        }
    }
	
	

		@Override
	    public Map<String, Integer> countMarqueOccurrences(List<Telephone> phones) {
	        Map<String, Integer> marqueCountMap = new HashMap();

	        for (Telephone phone : phones) {
	            String marque = phone.getMarque();
	            int count = marqueCountMap.getOrDefault(marque, 0);
	            marqueCountMap.put(marque, count + 1);
	        }

	        return marqueCountMap;
	    }
	
	
	
	@Override
	public Abonnement addAbonnement(Abonnement u) {
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("post");
    	logentry.setEntity("abonnement");
    	logentry.setMessage("Ajout de l'abonnement : "+u.getNom()+" avec Forfeit : "+u.getForfeit());
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
		return ar.save(u);
	}
	
	@Override
	public User addUser(User u) {
		
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("post");
    	logentry.setEntity("user");
    	logentry.setMessage("Ajout employé : "+u.getNom()+" "+u.getPrenom()+" avec le matricule : "+u.getMatricule());
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
		System.out.println(u.getAbonnement()+"==================================");
		u.setDatechart(LocalDate.now());
		
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
		User user = ur.findById(u).orElse(null);
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("delete");
    	logentry.setEntity("user");
    	logentry.setMessage("Suppression Employé : "+user.getNom()+" avec le matricule "+user.getMatricule()+" est supprimé.");
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
		ur.deleteById(u);
	}
	
	@Override
	public void deletephoneById(Long u) {
		Telephone t = tr.findById(u).orElse(null);
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("delete");
    	logentry.setEntity("phone");
    	logentry.setMessage("Suppression telephone : "+t.getName()+" avec le numero de serie "+t.getNumero_serie()+" est supprimé avec motif "+t.getMotif());
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
		tr.deleteById(u);
	}
	
	@Override
	public User login(String matricule,String password) {
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("get");
    	logentry.setEntity("user");
    	logentry.setMessage("utilisateur qui a le matricule "+matricule+" a ete conncete ");
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
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
	    LogEntry logEntry = new LogEntry();
	    logEntry.setMethode("put"); //no change
	    logEntry.setEntity("user"); // no change
	    logEntry.setDatetime(LocalDateTime.now());

	    User existingUser = ur.findById(user.getId()).orElse(null);
	    if (existingUser == null) {
	        // User does not exist, handle this case accordingly
	        return null;
	    }

	    // Update general user information
	    existingUser.setAffectation(user.getAffectation()); existingUser.setMatricule(user.getMatricule()); existingUser.setNom(user.getNom()); existingUser.setNumber(user.getNumber());
	    existingUser.setPoste(user.getPoste()); existingUser.setPrenom(user.getPrenom()); existingUser.setPassword(existingUser.getPassword());

	    //check for telephone
	    if(user.getTelephone().getId()==0) { //if telephone is null
	    	System.out.println("telephone null");
	    	if(existingUser.getTelephone() !=null) {
		    	logEntry.setMessage("Modification Employé : telephone "+existingUser.getTelephone().getName()+" est retiré avec le motif "
		    			+user.getTelephone().getMotif()+" pour l'employé : "+existingUser.getNom()+" "+existingUser.getPrenom()+" avec le commentaire "+user.getTelephone().getCommantaire());
		    	existingUser.setTelephone(null);
		    	existingUser.setActive(false);
	    	}

	    }
	    else { 								//if telephone is not null
	    	System.out.println("telephone not null");
	    	Telephone newtele = tr.findById(user.getTelephone().getId()).orElse(null);
	    	existingUser.setActive(true);
	    	//existingUser.setTelephone(newtele);
	    	
	    	if(existingUser.getTelephone() !=null) { //check for the old phone if exisite
	    		System.out.println("he have already a phone");
	    		Telephone oldphone = tr.findById(existingUser.getTelephone().getId()).orElse(null);
	    		System.out.println(newtele.getId()==oldphone.getId()? 0:1);
	    		if(!newtele.equals(oldphone)) {
	    			System.out.println("testetettetetetetet");
	    			oldphone.setMotif(user.getTelephone().getMotif());
	    			oldphone.setCommantaire(user.getTelephone().getCommantaire());
	    			if(user.getTelephone().getMotif().equals("vol") || user.getTelephone().getMotif().equals("casse")) {
	    				oldphone.setEtat("Hors Service");
	    			}
	    			///////////////// danger dont change any message 
	    		////// lmima matbadloch 
	    			logEntry.setMessagetele("changer le tele avec un autre tele"); 
	    		////// lmima matbadloch 
	    			
	    			logEntry.setMessage("Modification Employé : le telephone est changé de "+oldphone.getName()+" vers "+newtele.getName()+" avec le motif "
	    	    			+user.getTelephone().getMotif()+" pour l'employé : "+existingUser.getNom()+" "+existingUser.getPrenom()+" avec le commentaire "+user.getTelephone().getCommantaire());
	    			log.save(logEntry);
	    		}
	    		else {
	    			System.out.println("hgjhfjhgfjhgfjh");
	    		}
	    	}
	    	else {   //check for the old phone if not exisite
	    		System.out.println("he dont have already a phone");
	    		//existingUser.setActive(true);
	    		//existingUser.setTelephone(user.getTelephone());
	    		logEntry.setMessage("Modification Employé : le telephone "+newtele.getName()+" avec le numero de serie "+newtele.getNumero_serie()+" est affécté à l'employé : "+existingUser.getNom()+" "+existingUser.getPrenom());
	    		log.save(logEntry);
	    		
	    	}
	    	existingUser.setTelephone(newtele);
	    }
	    
	    //check for abonnement
	    if(user.getAbonnement()==null) { //if abonnment is null
	    	//existingUser.setActive(false);
	    	existingUser.setAbonnement(null);
	    	System.out.println("abonnement null");
	    	
	    }
	    else {
	    	System.out.println("abonnement not null");
			Abonnement ab = ar.findById(user.getAbonnement().getId()).orElseThrow();
	    	if(existingUser.getAbonnement()!=null) {
		    	logEntry.setMessage("Modification Abonnement : l'abonnement est changé de "+existingUser.getAbonnement().getNom()+" vers "+ab.getNom()+" avec le forfeit "+ab.getForfeit()+" pour l'employé : "+existingUser.getNom()+" "+existingUser.getPrenom());
				log.save(logEntry);
	    	}
	    	else {
		    	logEntry.setMessage("Modification Abonnement : l'abonnement est changé vers "+ab.getNom()+" avec le forfeit "+ab.getForfeit()+" pour l'employé : "+existingUser.getNom()+" "+existingUser.getPrenom());
				log.save(logEntry);
	    	}
	    	existingUser.setAbonnement(ab);
	    }
	    
	    ur.save(existingUser);
	    //logEntry.setMessage("User updated successfully");
	    log.save(logEntry);
	    return existingUser;
	}
	
	public Telephone UpdatePhone(Telephone tele) {
		System.out.println(tele.toString());
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("put");
    	logentry.setEntity("phone");
    	logentry.setMessage("Modification Telephone :"+tele.getNumero_serie());
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
		Telephone t = tr.findById(tele.getId()).orElseThrow();
		t.setName(tele.getName());
		t.setNumero_facture(tele.getNumero_facture());
		t.setMotif(tele.getMotif());
		t.setAcquisition(tele.getAcquisition());
		t.setCommantaire(tele.getCommantaire());
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
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("post");
    	logentry.setEntity("phone");
    	logentry.setMessage("Ajout de telephone : "+t.getName()+" avec le numero de serie : "+ t.getNumero_serie());
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
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
	public void deleteAbonnementById(Long t) {
		Abonnement u = ar.findById(t).orElseThrow();
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("delete");
    	logentry.setEntity("abonnement");
    	logentry.setMessage("Suppression Abonnement : "+u.getNom()+" avec le forfeit "+u.getForfeit()+" est supprimé.");
    	logentry.setDatetime(LocalDateTime.now());
    	log.save(logentry);
		ar.deleteById(t);
	
	}

	@Override
	public Abonnement UpdateAbonnement(Abonnement t) {
		Abonnement ab = ar.findById(t.getId()).orElseThrow();
		ab.setNom(t.getNom());
		ab.setForfeit(t.getForfeit());
		ab.setMontant(t.getMontant());
		ab.setRemise(t.getRemise());
		LogEntry logentry = new LogEntry();
    	logentry.setMethode("put");
    	logentry.setEntity("abonnement");
    	logentry.setDatetime(LocalDateTime.now());
		logentry.setMessage("Modification Abonnement :"+t.getNom()+" "+t.getForfeit());
		log.save(logentry);
		return ar.save(ab);
	}



	@Override
	public List<LogEntry> findalllogs() {
		// TODO Auto-generated method stub
		return log.findAll();
	}

	
	

	
	
	
}
