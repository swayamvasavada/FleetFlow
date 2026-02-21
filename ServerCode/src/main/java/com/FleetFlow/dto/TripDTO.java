package com.FleetFlow.dto;

import java.time.LocalDateTime;

import com.FleetFlow.util.TripStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TripDTO {

	private Long tripID;

	private Long vehicleID;
	private Long driverID;

	private String origin;
	private String destination;
	private Double cargoWeightKg;

	private Double estimatedFuelCost;
	private Double actualFuelCost;

	private Double startOdometer;
	private Double endOdometer;

	private TripStatus status;

	private LocalDateTime startTime;
	private LocalDateTime endTime;

	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
}