package com.falcon71181.tasksyncmysql.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.falcon71181.tasksyncmysql.models.User;

/**
 * UserRepository
 */
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByEmail(String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

}
