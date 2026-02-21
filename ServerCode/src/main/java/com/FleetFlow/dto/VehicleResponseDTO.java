package com.FleetFlow.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VehicleResponseDTO {
	
	private Long totalRecords;

    private List<VehicleDTO> vehicleDTOList;


}
