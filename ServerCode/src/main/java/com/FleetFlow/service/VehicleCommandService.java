package com.FleetFlow.service;

import com.FleetFlow.dto.VehicleDTO;

public interface VehicleCommandService {
	
	VehicleDTO addVehicle(VehicleDTO vehicleDTO);
	
	VehicleDTO updateVehicle(VehicleDTO vehicleDTO);
}
