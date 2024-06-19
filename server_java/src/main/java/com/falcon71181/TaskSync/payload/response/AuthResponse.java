package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse implements ApiResponse {

  @JsonProperty("message")
  private String message;

  @JsonProperty("username")
  private String username;

  @JsonProperty("token")
  private String token;

  public AuthResponse(String message, String username, String token) {
    this.message = message;
    this.username = username;
    this.token = token;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
