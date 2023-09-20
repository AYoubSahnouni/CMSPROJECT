package com.ServerConfig.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@NoArgsConstructor
@Entity
@Table(name = "logentry")
public class LogEntry {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id ;
	private String message;
	private String messagetele;
	private String entity;
	private String methode;
	private LocalDateTime datetime;

}
