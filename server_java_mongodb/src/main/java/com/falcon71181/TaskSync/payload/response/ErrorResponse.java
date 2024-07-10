package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * ErrorResponse
 */
@Getter
@Setter
public class ErrorResponse implements ApiResponse {

  @JsonProperty("error")
  private String error;

  public ErrorResponse(String error) {
    this.error = error;
  }
}
