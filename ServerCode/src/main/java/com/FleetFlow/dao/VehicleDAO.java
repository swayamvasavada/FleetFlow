package com.FleetFlow.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.FleetFlow.entity.Vehicle;

public interface VehicleDAO extends JpaRepository<Vehicle, Long> {

	Vehicle findByVehicleIDAndActive(Long vehicleID, boolean active);

	List<Vehicle> findByActive(boolean b);
	

}
