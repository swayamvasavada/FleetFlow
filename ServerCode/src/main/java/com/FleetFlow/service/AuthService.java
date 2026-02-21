package com.FleetFlow.service;

import com.FleetFlow.dto.LoginDTO;
import com.FleetFlow.dto.SignupDTO;

public interface AuthService {
    SignupDTO signup(SignupDTO signupDTO) throws Exception;

    void sendVerificationMail(String email) throws Exception;

    LoginDTO login(LoginDTO loginDTO) throws Exception;

    LoginDTO verifyUser(String token) throws Exception;

    void updateDriverAvailability(String email, boolean isAvailable) throws Exception;
}
