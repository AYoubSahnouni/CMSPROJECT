package com.ServerConfig.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ServerConfig.entities.LogEntry;

public interface logentryRepo extends JpaRepository<LogEntry, Long>{

}
