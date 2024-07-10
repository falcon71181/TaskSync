package com.falcon71181.TaskSync.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
}
