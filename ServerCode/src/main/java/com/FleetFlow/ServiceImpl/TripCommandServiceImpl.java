package com.FleetFlow.ServiceImpl;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FleetFlow.dao.TripDAO;
import com.FleetFlow.dao.UserDAO;
import com.FleetFlow.dao.VehicleDAO;
import com.FleetFlow.dto.TripDTO;
import com.FleetFlow.entity.Trip;
import com.FleetFlow.entity.User;
import com.FleetFlow.entity.Vehicle;
import com.FleetFlow.service.TripCommandService;
import com.FleetFlow.util.Role;
import com.FleetFlow.util.TripStatus;

@Service
public class TripCommandServiceImpl implements TripCommandService {

	@Autowired
	private TripDAO tripDAO;

	@Autowired
	private VehicleDAO vehicleDAO;

	@Autowired
	private UserDAO userDAO;

	@Override
	public TripDTO scheduleTrip(TripDTO dto) {

		Vehicle vehicle = vehicleDAO.findByVehicleIDAndActive(dto.getVehicleID(), true);

		if (vehicle == null) {
			throw new RuntimeException("Vehicle not found or inactive");
		}

		User user = userDAO.findByUserIDAndActive(dto.getDriverID(), true);

		if (user == null) {
			throw new RuntimeException("User not found or inactive");
		}

		if (!(user.getRole() == Role.ROLE_MANAGER || user.getRole() == Role.ROLE_DISPATCHER)) {
			throw new RuntimeException("Only Manager or Dispatcher can schedule trip");
		}

		Trip trip = new Trip();

		BeanUtils.copyProperties(dto, trip, "tripID", "vehicle", "driver", "status", "active", "createdAt");

		trip.setVehicle(vehicle);
		trip.setDriver(null); // No driver during scheduling
		trip.setStatus(TripStatus.SCHEDULED);
		trip.setActive(true);
		trip.setCreatedAt(new Date());

		tripDAO.save(trip);

		TripDTO response = new TripDTO();
		BeanUtils.copyProperties(trip, response);

		response.setVehicleID(vehicle.getVehicleID());
		response.setDriverID(null); // Scheduler

		return response;
	}

	@Override
	public TripDTO assignDriver(Long tripID, Long driverID) {

		Trip trip = tripDAO.findByTripIDAndActive(tripID, true);

		if (trip == null) {
			throw new RuntimeException("Trip not found or inactive");
		}

		if (trip.getDriver() != null) {
			throw new RuntimeException("Driver already assigned to this trip");
		}

		User driver = userDAO.findByUserIDAndActive(driverID, true);

		if (driver == null) {
			throw new RuntimeException("Driver not found or inactive");
		}

		if (driver.getRole() != Role.ROLE_DRIVER) {
			throw new RuntimeException("Selected user is not a driver");
		}
		boolean isBusy = tripDAO.existsByDriverUserIDAndStatusIn(driverID,
				List.of(TripStatus.ASSIGNED, TripStatus.IN_TRANSIT));

		if (isBusy) {
			throw new RuntimeException("Driver is already assigned to another active trip");
		}

		trip.setDriver(driver);
		trip.setStatus(TripStatus.ASSIGNED);
		trip.setModifiedAt(new Date());

		tripDAO.save(trip);

		TripDTO response = new TripDTO();
		BeanUtils.copyProperties(trip, response);

		response.setVehicleID(trip.getVehicle().getVehicleID());
		response.setDriverID(driver.getUserID());

		return response;
	}

	@Override
	public TripDTO completeTrip(Long tripId, Long driverId, Double endOdometer, Double actualFuelCost) {

		Trip trip = tripDAO.findByTripIDAndActive(tripId, true);

		if (trip == null) {
			throw new RuntimeException("Trip not found or inactive");
		}

		if (trip.getDriver() == null) {
			throw new RuntimeException("No driver assigned to this trip");
		}

		// 🔥 Validate correct driver
		if (!trip.getDriver().getUserID().equals(driverId)) {
			throw new RuntimeException("You are not assigned to this trip");
		}

		if (trip.getStatus() != TripStatus.IN_TRANSIT) {
			throw new RuntimeException("Trip must be STARTED before completing");
		}

		if (endOdometer <= trip.getStartOdometer()) {
			throw new RuntimeException("End odometer must be greater than start odometer");
		}

		trip.setEndOdometer(endOdometer);
		trip.setActualFuelCost(actualFuelCost);
		trip.setEndTime(new Date());
		trip.setStatus(TripStatus.COMPLETED);
		trip.setModifiedAt(new Date());

		tripDAO.save(trip);

		TripDTO response = new TripDTO();
		BeanUtils.copyProperties(trip, response);

		response.setVehicleID(trip.getVehicle().getVehicleID());
		response.setDriverID(trip.getDriver().getUserID());

		return response;
	}
}
