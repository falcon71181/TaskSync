package com.falcon71181.TaskSync.controllers;

import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletResponse;

/**
 * HealthCheck
 */
@RestController
public class HealthCheck {

  @GetMapping("/")
  public void rootRoute(HttpServletResponse response) throws IOException {
    response.sendRedirect("/health");
  }

  @GetMapping("/health")
  public ResponseEntity<String> healthCheck() {
    return new ResponseEntity<>("Ok", HttpStatus.OK);
  }
}
