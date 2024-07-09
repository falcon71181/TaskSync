package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * CreateTaskResponse
 */
@Getter
@Setter
public class CreateTaskResponse implements ApiResponse {
  @JsonProperty("message")
  private String message;

  public CreateTaskResponse(String message) {
    this.message = message;
  }
}
