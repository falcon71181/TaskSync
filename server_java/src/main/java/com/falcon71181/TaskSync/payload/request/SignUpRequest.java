package com.falcon71181.TaskSync.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
  private String username;
  private String email;
  private String password;
  private String confirmPassword;
}
