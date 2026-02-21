package com.FleetFlow.service;

import com.FleetFlow.dto.TripDTO;

public interface TripCommandService {

	TripDTO scheduleTrip(TripDTO tripDTO);

	TripDTO assignDriver(Long tripId, Long driverId);

	TripDTO completeTrip(Long tripId, Long driverId, Double endOdometer, Double actualFuelCost);

}
