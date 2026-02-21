package com.FleetFlow.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.FleetFlow.dto.ResponseDTO;
import com.FleetFlow.dto.VehicleDTO;
import com.FleetFlow.service.VehicleCommandService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/vehicle/command")
public class VehicleCommandController {

	@Autowired
	private VehicleCommandService vehicleCommandService;

	@ManagedOperation(description = "For adding take out shifts")
	@PostMapping(value = "/")
	public @ResponseBody ResponseDTO addVehicle(@RequestBody VehicleDTO vehicleDTO) {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			System.out.println("In VehicleCommandController -> addVehicle API..");

			VehicleDTO resultDTO = vehicleCommandService.addVehicle(vehicleDTO);

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
	
	@ManagedOperation(description = "For adding take out shifts")
	@PutMapping(value = "/")
	public @ResponseBody ResponseDTO updateVehicle(@RequestBody VehicleDTO vehicleDTO) {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			System.out.println("In VehicleCommandController -> updateVehicle API..");

			VehicleDTO resultDTO = vehicleCommandService.updateVehicle(vehicleDTO);

			responseDTO.setServiceResult(resultDTO);
			responseDTO.setMessage("Vehicle updated successfully");
			responseDTO.setSuccess(1);

			System.out.println("Exiting VehicleCommandController -> updateVehicle API..");

		} catch (Exception e) {

			responseDTO.setServiceResult(null);
			responseDTO.setMessage("Failed to update vehicle");
			responseDTO.setSuccess(0);
		}

		return responseDTO;
	}

}
