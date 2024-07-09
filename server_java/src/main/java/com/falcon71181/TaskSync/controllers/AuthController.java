package com.falcon71181.TaskSync.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.falcon71181.TaskSync.models.User;
import com.falcon71181.TaskSync.payload.request.LoginRequest;
import com.falcon71181.TaskSync.payload.request.SignUpRequest;
import com.falcon71181.TaskSync.payload.response.ApiResponse;
import com.falcon71181.TaskSync.payload.response.AuthResponse;
import com.falcon71181.TaskSync.payload.response.ErrorResponse;
import com.falcon71181.TaskSync.service.UserService;
import com.falcon71181.TaskSync.service.impl.JWTServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class AuthController {

  @Autowired
  UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JWTServiceImpl jwtService;

  @PostMapping("/register")
  public ResponseEntity<ApiResponse> registerUser(@RequestBody SignUpRequest request) {
    try {
      if (userService.existsByUsernameOrEmail(request.getUsername(), request.getEmail())) {
        ErrorResponse errorResponse = new ErrorResponse("User already exists");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
      }

      User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
      userService.saveEntry(newUser);

      String token = jwtService.generateToken(newUser);
      AuthResponse authResponse = new AuthResponse("User registered successfully.", newUser.getUsername(), token);
      return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse> loginUser(@RequestBody LoginRequest request) {
    try {
      Optional<User> optionalUser = userService.findByEmail(request.getEmail());

      if (optionalUser.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("User not found"));
      }

      User user = optionalUser.get();

      // Verify password using password encoder
      if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid password"));
      }

      String token = jwtService.generateToken(user);
      AuthResponse authResponse = new AuthResponse("User logged in successfully.", user.getUsername(), token);
      return ResponseEntity.ok(authResponse);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/validate")
  public Boolean validateJwtToken(@RequestHeader("Authorization") String authorizationHeader) {
    try {
      String jwtToken = authorizationHeader.substring(7);

      boolean isValid = jwtService.validateJwtToken(jwtToken);

      // NOTE: filtered req has authenticationToken in it that we have setup in filter
      Authentication authenticationToken = SecurityContextHolder.getContext().getAuthentication();
      String userEmail = authenticationToken.getName();

      return isValid;
    } catch (Exception e) {
      // Handle any exceptions
      // ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
      return false;
    }
  }
}
