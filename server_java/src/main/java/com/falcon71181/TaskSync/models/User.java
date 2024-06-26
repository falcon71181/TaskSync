package com.falcon71181.TaskSync.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Data;

/**
 * User
 */
@Document(collection = "users")
@Data
public class User {

  @Id
  private ObjectId id;
  @NonNull
  private String username;
  @NonNull
  @Indexed(unique = true)
  private String email;
  @NonNull
  private String password;

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
