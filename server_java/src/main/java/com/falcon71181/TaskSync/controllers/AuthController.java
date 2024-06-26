package com.falcon71181.TaskSync.controllers;

import com.falcon71181.TaskSync.models.User;
import com.falcon71181.TaskSync.payload.request.LoginRequest;
import com.falcon71181.TaskSync.payload.request.SignUpRequest;
import com.falcon71181.TaskSync.payload.response.ApiResponse;
import com.falcon71181.TaskSync.payload.response.AuthResponse;
import com.falcon71181.TaskSync.payload.response.ErrorResponse;
import com.falcon71181.TaskSync.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class AuthController {

  @Autowired
  UserService userService;

  @PostMapping("/register")
  public ResponseEntity<ApiResponse> registerUser(@RequestBody SignUpRequest request) {
    try {
      if (userService.existsByUsernameOrEmail(request.getUsername(), request.getEmail())) {
        ErrorResponse errorResponse = new ErrorResponse("User already exists");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
      }

      User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
      userService.saveEntry(newUser);

      AuthResponse authResponse = new AuthResponse("User registered successfully.", newUser.getUsername(),
          "479321470312840723035392580932");
      return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse> loginUser(@RequestBody LoginRequest request) {
    AuthResponse ar = new AuthResponse("User logined successfully.",
        "falcon71181",
        "479321470312840723035392580932");
    return new ResponseEntity<>(ar, HttpStatus.CREATED);
    // ErrorResponse errorResponse = new ErrorResponse("User already exists");
    // return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }
}
