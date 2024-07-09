package com.falcon71181.TaskSync.payload.request;

import lombok.Getter;
import lombok.Setter;

/**
 * CreateTaskRequest
 */
@Getter
@Setter
public class CreateTaskRequest {
  private String title;
  private String description;
}
