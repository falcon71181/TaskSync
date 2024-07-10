package com.falcon71181.tasksyncmysql.payload.request.user;

/**
 * LoginApiRequestPayload
 */
public class LoginApiRequestPayload {

  private String email;
  private String password;

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }

  public LoginApiRequestPayload(String email, String password) {
    this.email = email;
    this.password = password;
  }
}
