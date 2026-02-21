package com.FleetFlow.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FleetFlow.entity.Trip;
import com.FleetFlow.util.TripStatus;

public interface TripDAO extends JpaRepository<Trip, Long>{

	 Trip findByTripIDAndActive(Long tripID, boolean active);

	 boolean existsByDriverUserIDAndStatusIn(Long driverID, List<TripStatus> of);
}
