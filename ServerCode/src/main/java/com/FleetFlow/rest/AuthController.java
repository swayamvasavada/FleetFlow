package com.FleetFlow.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.FleetFlow.dto.LoginDTO;
import com.FleetFlow.dto.ResponseDTO;
import com.FleetFlow.dto.SignupDTO;
import com.FleetFlow.exception.AuthenticationException;
import com.FleetFlow.exception.ResourceNotFoundExcepiton;
import com.FleetFlow.service.AuthService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @PostMapping(value = "/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody SignupDTO signupDTO) {
        System.out.println("Entering into AuthController -> Signup");

        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO.setServiceResult(authService.signup(signupDTO));
            responseDTO.setMessage("User signed up successfully");
            responseDTO.setSuccess(1);
        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setServiceResult("Failed to create user");
            responseDTO.setMessage("Failed to create user");
            responseDTO.setSuccess(0);

            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(500));
        }
        
        System.out.println("Exiting from AuthController -> Signup");
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping(value = "/verify")
    public ResponseEntity<ResponseDTO> verifyEmail(@RequestParam(required = true) String email) {
        System.out.println("Entering into AuthController -> verifyEmail");

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            authService.sendVerificationMail(email);
            responseDTO.setServiceResult("Email sent successfully");
            responseDTO.setMessage("Email sent successfully");
            responseDTO.setSuccess(1);
        } catch (ResourceNotFoundExcepiton e) {
            e.printStackTrace();
            responseDTO.setServiceResult(e.getMessage());
            responseDTO.setMessage(e.getMessage());
            responseDTO.setSuccess(0);
            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(404));
        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setServiceResult("Failed to create verification link");
            responseDTO.setMessage("Failed to create verification link");
            responseDTO.setSuccess(0);

            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(500));
        }

        System.out.println("Exiting from AuthController -> verifyEmail");
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        System.out.println("Entering into AuthController -> login");

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            loginDTO = authService.login(loginDTO);
            responseDTO.setServiceResult(loginDTO);
            
            if (loginDTO.getIsVerified()) {
                responseDTO.setMessage("Signed in successfully");
                responseDTO.setSuccess(1);
            } else {
                responseDTO.setMessage("Email is not verified");
                responseDTO.setSuccess(0);
            }
        } catch (ResourceNotFoundExcepiton e) {
            e.printStackTrace();
            responseDTO.setServiceResult(e.getMessage());
            responseDTO.setMessage(e.getMessage());
            responseDTO.setSuccess(0);
            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(404));
        } catch (AuthenticationException e) {
            e.printStackTrace();
            responseDTO.setServiceResult(e.getMessage());
            responseDTO.setMessage(e.getMessage());
            responseDTO.setSuccess(0);
            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(401));
        } catch (Exception e) {
            e.printStackTrace();
            responseDTO.setServiceResult("Failed to login");
            responseDTO.setMessage("Failed to login");
            responseDTO.setSuccess(0);

            return new ResponseEntity<>(responseDTO, HttpStatusCode.valueOf(500));
        }

        System.out.println("Exiting from AuthController -> login");
        return ResponseEntity.ok(responseDTO);
    }
}
