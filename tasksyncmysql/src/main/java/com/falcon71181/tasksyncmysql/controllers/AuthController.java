package com.falcon71181.tasksyncmysql.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

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

import com.falcon71181.tasksyncmysql.models.User;
import com.falcon71181.tasksyncmysql.services.user.UserService;
import com.falcon71181.tasksyncmysql.services.auth.JwtAuthService;
import com.falcon71181.tasksyncmysql.payload.request.user.SignUpApiRequestPayload;
import com.falcon71181.tasksyncmysql.payload.request.user.LoginApiRequestPayload;
import com.falcon71181.tasksyncmysql.payload.response.user.AuthApiResponsePayload;
import com.falcon71181.tasksyncmysql.payload.response.ApiResponsePayload;
import com.falcon71181.tasksyncmysql.payload.response.ErrorApiResponsePayload;

/**
 * AuthController
 */
@RestController
@RequestMapping("/users")
public class AuthController {

  @Autowired
  UserService userService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  JwtAuthService jwtService;

  @PostMapping("/register")
  public ResponseEntity<ApiResponsePayload> registerUser(@RequestBody SignUpApiRequestPayload request) {
    try {
      if (userService.existsByUsernameOrEmail(request.getUsername(), request.getEmail())) {
        ErrorApiResponsePayload errorResponse = new ErrorApiResponsePayload("User already exists");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
      }

      User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
      userService.saveEntry(newUser);

      String token = jwtService.generateToken(newUser);
      AuthApiResponsePayload authResponse = new AuthApiResponsePayload("User registered successfully.",
          newUser.getUsername(), token);
      return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    } catch (Exception e) {
      ErrorApiResponsePayload errorResponse = new ErrorApiResponsePayload(e.getMessage());
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponsePayload> loginUser(@RequestBody LoginApiRequestPayload request) {
    try {
      Optional<User> optionalUser = userService.findByEmail(request.getEmail());

      if (optionalUser.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorApiResponsePayload("User not found"));
      }

      User user = optionalUser.get();

      // Verify password using password encoder
      if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorApiResponsePayload("Invalid password"));
      }

      String token = jwtService.generateToken(user);
      AuthApiResponsePayload authResponse = new AuthApiResponsePayload("User logged in successfully.",
          user.getUsername(), token);
      return ResponseEntity.ok(authResponse);

    } catch (Exception e) {
      ErrorApiResponsePayload errorResponse = new ErrorApiResponsePayload(e.getMessage());
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
      // ErrorApiResponsePayload errorResponse = new
      // ErrorApiResponsePayload(e.getMessage());
      return false;
    }
  }
}
