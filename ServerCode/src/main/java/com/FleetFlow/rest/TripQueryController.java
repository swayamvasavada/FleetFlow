package com.FleetFlow.rest;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FleetFlow.dto.ResponseDTO;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController(value = "/api/trip/query")
public class TripQueryController {

    @GetMapping("/")
    public ResponseEntity<ResponseDTO> fetchTrip() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            
            responseDTO.setServiceResult(null);
            responseDTO.setMessage("Trip details fetched successfully");
            responseDTO.setSuccess(1);
        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setServiceResult(null);
            responseDTO.setMessage("Failed to fetch trip details");
            responseDTO.setSuccess(0);
            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(500));
        }
        return ResponseEntity.ok(responseDTO);
    } 
}
