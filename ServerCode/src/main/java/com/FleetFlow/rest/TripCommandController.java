package com.FleetFlow.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.FleetFlow.dto.ResponseDTO;
import com.FleetFlow.dto.TripDTO;
import com.FleetFlow.service.TripCommandService;

@CrossOrigin
@RestController
@RequestMapping("/api/trip/command")
public class TripCommandController {

	@Autowired
	private TripCommandService tripCommandService;

	@PutMapping("/schedule/manager")
	public ResponseDTO scheduleTrip(@RequestBody TripDTO tripDTO) {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			TripDTO result = tripCommandService.scheduleTrip(tripDTO);

			responseDTO.setServiceResult(result);
			responseDTO.setMessage("Trip scheduled successfully");
			responseDTO.setSuccess(1);

		} catch (Exception e) {
			responseDTO.setMessage(e.getMessage());
			responseDTO.setSuccess(0);
		}

		return responseDTO;
	}

	@PutMapping("/assignDriver/manager")
	public ResponseDTO assignDriver(@RequestParam Long tripID, @RequestParam Long driverID) {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			TripDTO result = tripCommandService.assignDriver(tripID, driverID);

			responseDTO.setServiceResult(result);
			responseDTO.setMessage("Driver assigned successfully");
			responseDTO.setSuccess(1);

		} catch (Exception e) {
			responseDTO.setMessage(e.getMessage());
			responseDTO.setSuccess(0);
		}

		return responseDTO;
	}

	@PutMapping("/complete")
	public ResponseDTO completeTrip(@RequestBody TripDTO dto) {

		ResponseDTO responseDTO = new ResponseDTO();

		try {
			TripDTO result = tripCommandService.completeTrip(dto.getTripID(), dto.getDriverID(), dto.getEndOdometer(),
					dto.getActualFuelCost());

			responseDTO.setServiceResult(result);
			responseDTO.setMessage("Trip completed successfully");
			responseDTO.setSuccess(1);

		} catch (Exception e) {
			responseDTO.setMessage(e.getMessage());
			responseDTO.setSuccess(0);
		}

		return responseDTO;
	}
}