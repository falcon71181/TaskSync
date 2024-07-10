package com.falcon71181.TaskSync.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.falcon71181.TaskSync.models.Task;
import com.falcon71181.TaskSync.repository.TaskRepository;

@Service
public class TaskService {

  private final TaskRepository taskRepository;

  @Autowired
  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public void saveEntry(Task task) {
    taskRepository.save(task);
  }

  public void deleteByObjectId(ObjectId id) {
    if (!existByObjectId(id))
      return;
    taskRepository.deleteById(id);
  }

  public boolean existByObjectId(ObjectId id) {
    return taskRepository.existsById(id);
  }

  public Optional<Task> findByObjectId(ObjectId id) {
    return taskRepository.findById(id);
  }

  public Optional<List<Task>> findByUserEmail(String email) {
    return taskRepository.findByUserEmail(email);
  }
}
