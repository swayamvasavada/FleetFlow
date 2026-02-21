package com.FleetFlow.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FleetFlow.entity.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    User findByEmailAndActive(String email, Boolean active);

    boolean existsByEmail(String email);
}
