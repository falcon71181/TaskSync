package com.falcon71181.TaskSync.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

import org.bson.types.ObjectId;
import com.falcon71181.TaskSync.models.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {
  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  Optional<User> findByUsername(String username);
}
