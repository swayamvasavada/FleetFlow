package com.FleetFlow.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FleetFlow.dto.ResponseDTO;
import com.FleetFlow.service.AnalyticsService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping(value = "/fleetUtilization")
    public ResponseEntity<ResponseDTO> getFleetUtilization() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            responseDTO.setServiceResult(analyticsService.getFleetUtilization());
            responseDTO.setMessage("Fleet utilization fetched successfully");
            responseDTO.setSuccess(1);
        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setServiceResult("Failed to fetch fleet utilization");
            responseDTO.setMessage("Failed to fetch fleet utilization");
            responseDTO.setSuccess(0);
            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(500));
        }
        return ResponseEntity.ok(responseDTO);
    }
}
