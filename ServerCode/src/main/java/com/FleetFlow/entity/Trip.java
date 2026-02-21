package com.FleetFlow.entity;

import java.io.Serializable;
import java.util.Date;

import com.FleetFlow.util.TripStatus;

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
@Table(name = "TRIPS")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TripID")
    private Long tripID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VehicleID", nullable = false)
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DriverID", nullable = false)
    private User driver;

    @Column(name = "Origin", nullable = false)
    private String origin;

    @Column(name = "Destination", nullable = false)
    private String destination;

    @Column(name = "CargoWeightKg", nullable = false)
    private Double cargoWeightKg;

    @Column(name = "EstimatedFuelCost")
    private Double estimatedFuelCost;

    @Column(name = "ActualFuelCost")
    private Double actualFuelCost;

    @Column(name = "StartOdometer")
    private Double startOdometer;

    @Column(name = "EndOdometer")
    private Double endOdometer;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private TripStatus status;

    @Column(name = "StartTime")
    private Date startTime;

    @Column(name = "EndTime")
    private Date endTime;

    @Column(name = "Active")
	private Boolean active;
    
    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "ModifiedAt")
    private Date modifiedAt;
}