package com.falcon71181.tasksyncmysql.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * ErrorApiResponsePayload
 */
public class ErrorApiResponsePayload implements ApiResponsePayload {

  @JsonProperty("error")
  private String errorMessage;

  public void setErrorMessage(String error) {
    this.errorMessage = error;
  }

  public String getErrorMessage() {
    return this.errorMessage;
  }

  public ErrorApiResponsePayload(String error) {
    this.errorMessage = error;
  }
}
