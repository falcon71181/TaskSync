package com.falcon71181.tasksyncmysql.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HealthCheckController
 */
@RestController
@RequestMapping("/health")
public class HealthCheckController {

  @GetMapping
  public ResponseEntity<String> healthCheck() {
    return new ResponseEntity<>("Ok", HttpStatus.OK);
  }
}
