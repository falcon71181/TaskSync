package com.falcon71181.TaskSync.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.falcon71181.TaskSync.models.Task;

/**
 * TaskRepository
 */
public interface TaskRepository extends MongoRepository<Task, ObjectId> {

  Optional<List<Task>> findByUserEmail(String email);

  Optional<Task> findById(ObjectId id);

  void deleteById(ObjectId id);

  boolean existsById(ObjectId id);
}
