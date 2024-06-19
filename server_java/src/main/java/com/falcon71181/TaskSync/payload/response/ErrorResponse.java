package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * ErrorResponse
 */
public class ErrorResponse implements ApiResponse {

  @JsonProperty("error")
  private String error;

  public ErrorResponse(String error) {
    this.error = error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public String getError() {
    return error;
  }
}
