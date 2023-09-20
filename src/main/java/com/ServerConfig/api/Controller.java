package com.ServerConfig.api;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ServerConfig.entities.Abonnement;
import com.ServerConfig.entities.Telephone;
import com.ServerConfig.entities.User;
import com.ServerConfig.repository.TelephoneRepository;
import com.ServerConfig.service.IUserService;

@RestController	
@CrossOrigin(origins = "*")
public class Controller {
	
	@Autowired
	IUserService iu;
	@Autowired
	TelephoneRepository tl;
	
	
	
	
	@PostMapping("/addabonnement")
	public Abonnement addAbonnement(@RequestBody Abonnement u) {
		return iu.addAbonnement(u);
	}
	
	@PutMapping("/updateabonnement")
	public Abonnement UpdateAbonnement(@RequestBody Abonnement t) {
		return iu.UpdateAbonnement(t);
	}
	
	@DeleteMapping("/deleteabonnement/{id}")
	public void deleteAbonnementById(@PathVariable("id") Long u) {
		iu.deleteAbonnementById(u);
	}
	
	@PutMapping("/update")
	public User UpdateUser(@RequestBody User user) {
		return iu.UpdateUser(user);
	}
	
	@GetMapping("/circlephone")
    public Map<String, Integer> countPhoneMarques() {
        List<Telephone> phones = iu.AllPhones(); // Retrieve or generate your list of phones
        return iu.countMarqueOccurrences(phones);
    }

	@GetMapping("/numberphone")
	public Long getnumberphone(){
		return tl.count();
	}
	
	@PutMapping("/updatephone")
	public Telephone UpdatePhone(@RequestBody Telephone tele) {
		return iu.UpdatePhone(tele);
	}
	
	@GetMapping("/user/{id}")
	public Optional<User> getuserbyid(@PathVariable Long id){
		return iu.findUserById(id);
	}
	
	@PostMapping(value="/addemployer",consumes = MediaType.APPLICATION_JSON_VALUE)
	public User AjouterEmploye(@RequestBody User u){
		return iu.addUser(u);
	}
	
	@GetMapping("/login")
	public ResponseEntity<User> login(@RequestParam(value = "matricule") String matricule, @RequestParam(value = "password") String password) {
		return iu.findByMatriculeAndPassword(matricule, password);
	}

	@GetMapping("/logs")
	public ResponseEntity<?> getalllogs() {
		return ResponseEntity.ok(iu.findalllogs()) ;
	}
	
	@GetMapping("/userswithaffectation")
	public List<User> findUsersWithAffectation() {
		return iu.UsersWithAffectation();
	}
	
	@GetMapping("/userswithoutaffectation")
	public List<User> findUsersWithoutAffectation() {
		return iu.findUsersWithoutAffectation();
	}
	

	@PostMapping("/AddPhone")
	public Telephone AddPhone(@RequestBody Telephone t) {
		return iu.AjouterTele(t);
	}
	
	@GetMapping("/telephones")
	public List<Telephone> findAll(){
		return iu.AllPhones();
	}
	
	@GetMapping("/users")
	public List<User> findAllEmployees(){
		return iu.users();
	}
	
	@GetMapping("/abonnements")
	public List<Abonnement> Abonnements(){
		return iu.abonnements();
	}
	
	
    @DeleteMapping("/deleteTele/{id}")
    public void deletephone(@PathVariable("id") long id) {
    	iu.deletephoneById(id);
    }
    
    @DeleteMapping("/deleteEmploye/{id}")
    public void delete(@PathVariable("id") long id) {
    	iu.deleteById(id);
    }

    @GetMapping("/t")
    public List<Telephone> findTelephoneByUserAffectation(){
    		return iu.findTelephoneByUserAffectation();
    }
 
    
    @GetMapping("/userabonnement")
    public List<User> findUserwithAbonnements(){
    	return iu.findUserwithAbonnements();
    }
}
