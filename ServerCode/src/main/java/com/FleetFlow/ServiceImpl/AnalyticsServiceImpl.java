package com.FleetFlow.ServiceImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FleetFlow.dao.VehicleDAO;
import com.FleetFlow.service.AnalyticsService;
import com.FleetFlow.util.VehicleStatus;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private VehicleDAO vehicleDAO;
    
    @Override
    public Map<String, Integer> getFleetUtilization() {
        Integer availableCount = vehicleDAO.countByStatusAndActive(VehicleStatus.AVAILABLE, true);
        Integer inTransitCount = vehicleDAO.countByStatusAndActive(VehicleStatus.IN_TRANSIT, true);
        Integer inShopCount = vehicleDAO.countByStatusAndActive(VehicleStatus.IN_SHOP, true);

        return Map.of(
            "available", availableCount,
            "inTransit", inTransitCount,
            "inShop", inShopCount
        );
    }
    
}
