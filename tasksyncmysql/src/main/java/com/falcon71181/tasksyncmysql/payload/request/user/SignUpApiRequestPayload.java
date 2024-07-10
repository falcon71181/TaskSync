package com.falcon71181.tasksyncmysql.payload.request.user;

/**
 * SignUpApiRequestPayload
 */
public class SignUpApiRequestPayload {

  private String username;
  private String email;
  private String password;
  private String confirmPassword;

  public void setUsername(String username) {
    this.username = username;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setConfirmPassword(String confirmPassword) {
    this.confirmPassword = confirmPassword;
  }

  public String getUsername() {
    return this.username;
  }

  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }

  public String getConfirmPassword() {
    return this.confirmPassword;
  }

  public SignUpApiRequestPayload(String username, String email, String password, String confirmPassword) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
