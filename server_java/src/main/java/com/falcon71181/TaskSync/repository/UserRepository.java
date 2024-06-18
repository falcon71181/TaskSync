package com.falcon71181.TaskSync.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import com.falcon71181.TaskSync.models.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {
}
