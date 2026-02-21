package com.FleetFlow.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.FleetFlow.dao.TripDAO;
import com.FleetFlow.dto.TripDTO;
import com.FleetFlow.dto.VehicleDTO;
import com.FleetFlow.entity.Trip;
import com.FleetFlow.entity.Vehicle;
import com.FleetFlow.service.TripService;

public class TripServiceImpl implements TripService {

    @Autowired
    private TripDAO tripDAO;

    @Override
    public List<TripDTO> getAllTrips() {
        List<TripDTO> tripDTOs = new ArrayList<>();
        List<Trip> trips = tripDAO.findAllByActive(true);
        for (Trip trip : trips) {
            TripDTO tripDTO = new TripDTO();
            BeanUtils.copyProperties(trip, tripDTO);
            
            Vehicle vehicle = trip.getVehicle();
            if (vehicle != null) {
                VehicleDTO vehicleDTO = new VehicleDTO();
                BeanUtils.copyProperties(vehicle, vehicleDTO);
                tripDTO.setVehicleLicensePlate(vehicle.getLicensePlate());
            }

            tripDTOs.add(tripDTO);
        }
        return tripDTOs;
    }
    
}
