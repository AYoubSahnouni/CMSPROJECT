package com.ServerConfig;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
public class CmsProjectApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(CmsProjectApplication.class, args);
	}

	
	@Override
	public void run(String... args) throws Exception {
		

	}

}
