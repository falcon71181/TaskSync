package com.falcon71181.TaskSync.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Document(collection = "tasks")
public class Task {

  @Id
  private ObjectId id;

  @NonNull
  private String title;

  @NonNull
  private String description;

  @NonNull
  private String userEmail;

  @NonNull
  private Boolean isCompleted = false;

  public Task(String title, String description, String userEmail, Boolean isCompleted) {
    this.title = title;
    this.description = description;
    this.userEmail = userEmail;
    this.isCompleted = isCompleted;
  }
}
