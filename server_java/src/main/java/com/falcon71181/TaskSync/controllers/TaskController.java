package com.falcon71181.TaskSync.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.falcon71181.TaskSync.models.Task;
import com.falcon71181.TaskSync.payload.request.CreateTaskRequest;
import com.falcon71181.TaskSync.payload.response.ApiResponse;
import com.falcon71181.TaskSync.payload.response.CreateTaskResponse;
import com.falcon71181.TaskSync.payload.response.ErrorResponse;
import com.falcon71181.TaskSync.service.TaskService;

/**
 * TaskController
 */
@RestController
@RequestMapping("/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping("/create")
  public ResponseEntity<ApiResponse> createNewTask(@RequestBody CreateTaskRequest request) {
    try {
      Authentication authenticationToken = SecurityContextHolder.getContext().getAuthentication();
      String userEmail = authenticationToken.getName();

      Task newTask = new Task(request.getTitle(), request.getDescription(),
          userEmail, false);

      taskService.saveEntry(newTask);

      CreateTaskResponse response = new CreateTaskResponse("Task created successfully.");

      return new ResponseEntity<>(response, HttpStatus.CREATED);
    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
      return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
