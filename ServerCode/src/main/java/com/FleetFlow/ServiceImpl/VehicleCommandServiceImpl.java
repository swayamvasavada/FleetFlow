package com.FleetFlow.ServiceImpl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FleetFlow.dao.VehicleDAO;
import com.FleetFlow.dto.VehicleDTO;
import com.FleetFlow.entity.Vehicle;
import com.FleetFlow.service.VehicleCommandService;

@Service
public class VehicleCommandServiceImpl implements VehicleCommandService {

	@Autowired
	private VehicleDAO vehicleDAO;

	@Override
	public VehicleDTO addVehicle(VehicleDTO vehicleDTO) {
		
		System.out.println("In VehicleCommandServiceImpl -> addVehicle method..");

		
		Vehicle vehicle = new Vehicle();
		BeanUtils.copyProperties(vehicleDTO, vehicle);
		
		vehicle.setActive(true);
		Vehicle savedVehicle = vehicleDAO.save(vehicle);

		VehicleDTO responseDTO = new VehicleDTO();
		BeanUtils.copyProperties(savedVehicle, responseDTO);
		
		 System.out.println("Exiting VehicleCommandServiceImpl -> addVehicle method..");

		return responseDTO;
	}

	@Override
	public VehicleDTO updateVehicle(VehicleDTO vehicleDTO) {
		
		System.out.println("In VehicleCommandServiceImpl -> updateVehicle method..");

		if (vehicleDTO.getVehicleID() == null) {
			throw new IllegalArgumentException("Vehicle ID must not be null");
		}

		Vehicle existingVehicle = vehicleDAO.findByVehicleIDAndActive(vehicleDTO.getVehicleID(), true);

		if (existingVehicle == null) {
			throw new RuntimeException("Vehicle not found with ID: " + vehicleDTO.getVehicleID());
		}

		BeanUtils.copyProperties(vehicleDTO, existingVehicle);

		Vehicle updatedVehicle = vehicleDAO.save(existingVehicle);

		VehicleDTO responseDTO = new VehicleDTO();
		BeanUtils.copyProperties(updatedVehicle, responseDTO);
		
		System.out.println("Exiting VehicleCommandServiceImpl -> updateVehicle method..");

		return responseDTO;
	}
}