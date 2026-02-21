package com.FleetFlow.entity;

import java.io.Serializable;
import java.util.Date;

import com.FleetFlow.util.VehicleStatus;
import com.FleetFlow.util.VehicleType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "VEHICLES")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle implements Serializable {

	@Id
	@Column(name = "vehicleID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long vehicleID;

	@Column(name = "LicensePlate", nullable = false, unique = true)
	private String licensePlate;

	@Column(name = "Model", nullable = false)
	private String model;

	@Enumerated(EnumType.STRING)
	@Column(name = "VehicleType", nullable = false)
	private VehicleType vehicleType;

	@Column(name = "MaxLoadCapacity", nullable = false)
	private Double maxLoadCapacity;

	@Column(name = "OdometerReading")
	private Double odometerReading;

	@Enumerated(EnumType.STRING)
	@Column(name = "Status", nullable = false)
	private VehicleStatus status;

	@Column(name = "IsRetired")
	private Boolean isRetired;;

	@Column(name = "Active")
	private Boolean active;

	@Column(name = "CreatedAt")
	private Date createdAt;

	@Column(name = "ModifiedAt")
	private Date modifiedAt;
}