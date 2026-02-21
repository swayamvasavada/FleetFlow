package com.FleetFlow.dto;

import com.FleetFlow.util.VehicleStatus;
import com.FleetFlow.util.VehicleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {

	private Long vehicleID;

	private String licensePlate;

	private String model;

	private VehicleType vehicleType; // ENUM

	private Double maxLoadCapacity;

	private Double odometerReading;

	private VehicleStatus status; // ENUM

	private Boolean isRetired;
}
