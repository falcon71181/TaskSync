package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * UpdateTaskStatusResponse
 */
public class UpdateTaskStatusResponse implements ApiResponse {

  @JsonProperty("message")
  private String message;

  public UpdateTaskStatusResponse(String message) {
    this.message = message;
  }
}
