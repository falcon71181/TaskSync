package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * DeleteTaskResponse
 */
@Getter
@Setter
public class DeleteTaskResponse implements ApiResponse {

  @JsonProperty("message")
  private String message;

  public DeleteTaskResponse(String message) {
    this.message = message;
  }
}
