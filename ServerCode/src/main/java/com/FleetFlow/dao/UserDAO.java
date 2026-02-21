package com.FleetFlow.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FleetFlow.entity.Trip;
import com.FleetFlow.entity.User;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    User findByEmailAndActive(String email, Boolean active);

    boolean existsByEmail(String email);

	User findByUserIDAndActive(Long driverID, boolean b);
}
