package com.FleetFlow.ServiceImpl;

import java.util.Date;

import javax.naming.AuthenticationException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.FleetFlow.dao.UserDAO;
import com.FleetFlow.dto.LoginDTO;
import com.FleetFlow.dto.SignupDTO;
import com.FleetFlow.entity.User;
import com.FleetFlow.exception.ResourceNotFoundExcepiton;
import com.FleetFlow.service.AuthService;
import com.FleetFlow.util.EmailUtil;
import com.FleetFlow.util.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private SpringTemplateEngine templateEngine;
    
    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${frontend-url}")
    String frontendBaseUrl;

    @Override
    public SignupDTO signup(SignupDTO signupDTO) throws Exception {
        User user = new User();

        BeanUtils.copyProperties(signupDTO, user);
        user.setPassword(passwordEncoder.encode(signupDTO.getPassword()));
        user.setIsVerified(false);
        user.setActive(true);
        user.setCreatedAt(new Date());
        userDAO.save(user);

        sendVerificationMail(signupDTO.getEmail());
        
        return signupDTO;
    }

    @Override
    public void sendVerificationMail(String email) throws Exception {
        User user = userDAO.findByEmailAndActive(email, true);
        if (user == null) throw new ResourceNotFoundExcepiton("User not found with given email");

        String verificationToken = jwtUtil.generateToken(email, Long.valueOf(15 * 60 * 1000));
        String verificationUrl = new String("/user/verify/").concat(verificationToken);
        
        Context context = new Context();
        context.setVariable("name", user.getUsername());
        context.setVariable("verificationUrl", verificationUrl);

        String htmlContent = templateEngine.process("fleetflow-welcome", context);
        emailUtil.sendHtmlEmail(email, "Welcome to Our Platform", htmlContent);
    }

    @Override
    public LoginDTO login(LoginDTO loginDTO) throws Exception {
        User user = userDAO.findByEmailAndActive(loginDTO.getEmail(), true);
        if (user == null) throw new ResourceNotFoundExcepiton("User not found with given email");

        if (!user.getIsVerified()) {
            loginDTO.setPassword(null);
            loginDTO.setIsVerified(false);
            return null;
        }
        
        boolean isPasswordMatch = passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
        if (!isPasswordMatch) throw new AuthenticationException("Entered password is incorrect!");

        loginDTO.setPassword(null);
        loginDTO.setName(user.getName());
        return loginDTO;
    }
}
