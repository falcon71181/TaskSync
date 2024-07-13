package com.falcon71181.tasksyncmysql.payload.response.user;

import com.falcon71181.tasksyncmysql.payload.response.ApiResponsePayload;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * AuthApiResponsePayload
 */
public class AuthApiResponsePayload implements ApiResponsePayload {

  @JsonProperty("message")
  private String message;

  @JsonProperty("username")
  private String username;

  @JsonProperty("token")
  private String token;

  public AuthApiResponsePayload(String message, String username, String token) {
    this.message = message;
    this.username = username;
    this.token = token;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
