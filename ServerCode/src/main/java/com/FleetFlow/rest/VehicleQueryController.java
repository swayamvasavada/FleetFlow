package com.FleetFlow.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.FleetFlow.dto.ResponseDTO;
import com.FleetFlow.dto.VehicleDTO;
import com.FleetFlow.dto.VehicleResponseDTO;
import com.FleetFlow.service.VehicleQueryService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/vehicle/query")
public class VehicleQueryController {
	
	@Autowired
	private VehicleQueryService vehicleQueryService;
	
	@ManagedOperation(description = "For adding take out shifts")
	@GetMapping(value = "/{vehicleID}")
	public @ResponseBody ResponseDTO fetchVehicle(@PathVariable Long vehicleID) {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			System.out.println("In VehicleQueryController -> addVehicle API..");

			VehicleDTO resultDTO = vehicleQueryService.findByVehicleID(vehicleID);

			responseDTO.setServiceResult(resultDTO);
			responseDTO.setMessage("Vehicle added successfully");
			responseDTO.setSuccess(1);

			System.out.println("Exiting VehicleCommandController -> addVehicle API..");

		} catch (Exception e) {

			responseDTO.setServiceResult(null);
			responseDTO.setMessage("Failed to add vehicle");
			responseDTO.setSuccess(0);
		}

		return responseDTO;
	}
	
	@GetMapping(value = "/")
	public @ResponseBody ResponseDTO fetchAllVehicle() {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			System.out.println("In VehicleQueryController -> addVehicle API..");

			VehicleResponseDTO vehicleResponseDTO = vehicleQueryService.findAllVehicle();

			responseDTO.setServiceResult(vehicleResponseDTO);
			responseDTO.setMessage("Vehicle added successfully");
			responseDTO.setSuccess(1);

			System.out.println("Exiting VehicleCommandController -> addVehicle API..");

		} catch (Exception e) {

			responseDTO.setServiceResult(null);
			responseDTO.setMessage("Failed to add vehicle");
			responseDTO.setSuccess(0);
		}

		return responseDTO;
	}
	
	

}
