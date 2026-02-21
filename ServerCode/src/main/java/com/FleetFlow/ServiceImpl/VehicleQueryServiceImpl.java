package com.FleetFlow.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FleetFlow.dao.VehicleDAO;
import com.FleetFlow.dto.VehicleDTO;
import com.FleetFlow.dto.VehicleResponseDTO;
import com.FleetFlow.entity.Vehicle;
import com.FleetFlow.service.VehicleQueryService;

@Service
public class VehicleQueryServiceImpl implements VehicleQueryService {

	@Autowired
	private VehicleDAO vehicleDAO;

	@Override
	public VehicleDTO findByVehicleID(Long vehicleID) {

		System.out.println("In VehicleCommandServiceImpl -> findByID method..");

		VehicleDTO vehicleDTO = new VehicleDTO();

		Vehicle vehicle = vehicleDAO.findByVehicleIDAndActive(vehicleID, true);

		if (vehicle != null) {
			BeanUtils.copyProperties(vehicle, vehicleDTO);
		}

		System.out.println("Exiting VehicleCommandServiceImpl -> findByID method..");

		return vehicleDTO;
	}

	@Override
	public VehicleResponseDTO findAllVehicle() {

		System.out.println("In VehicleQueryServiceImpl -> findAllVehicle method..");

		VehicleResponseDTO responseDTO = new VehicleResponseDTO();

		List<Vehicle> vehicleList = vehicleDAO.findByActive(true);

		List<VehicleDTO> vehicleDTOList = new ArrayList<>();

		if (vehicleList != null && !vehicleList.isEmpty()) {

			for (Vehicle vehicle : vehicleList) {
				VehicleDTO vehicleDTO = new VehicleDTO();
				BeanUtils.copyProperties(vehicle, vehicleDTO);
				vehicleDTOList.add(vehicleDTO);
			}
		}

		responseDTO.setVehicleDTOList(vehicleDTOList);
		responseDTO.setTotalRecords((long) vehicleDTOList.size()); // count added

		System.out.println("Exiting VehicleQueryServiceImpl -> findAllVehicle method..");

		return responseDTO;
	}

}
