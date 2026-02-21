package com.FleetFlow.service;

import com.FleetFlow.dto.VehicleDTO;
import com.FleetFlow.dto.VehicleResponseDTO;

public interface VehicleQueryService {

	VehicleDTO findByVehicleID(Long vehicleID);

	VehicleResponseDTO findAllVehicle();

}
