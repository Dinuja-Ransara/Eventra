package com.eventmanagement.portal.controller;

import com.eventmanagement.portal.dto.LoginResponse;
import com.eventmanagement.portal.model.User;
import com.eventmanagement.portal.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity
                    .ok(new LoginResponse(true, user.getRole().name(), user.getName(), "Login successful"));
        }

        return ResponseEntity.status(401).body(new LoginResponse(false, null, null, "Invalid email or password"));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody User regRequest) {
        if (userRepository.findByEmail(regRequest.getEmail()) != null) {
            return ResponseEntity.badRequest().body(new LoginResponse(false, null, null, "Email is already in use"));
        }

        regRequest.setApproved(regRequest.getRole() != com.eventmanagement.portal.model.Role.ORGANIZER);
        userRepository.save(regRequest);

        return ResponseEntity.ok(
                new LoginResponse(true, regRequest.getRole().name(), regRequest.getName(), "Registration successful"));
    }
}