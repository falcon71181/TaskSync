package com.falcon71181.TaskSync.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.falcon71181.TaskSync.models.User;
import com.falcon71181.TaskSync.repository.UserRepository;

/**
 * UserService
 */
@Component
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public boolean existsByUsernameOrEmail(String username, String email) {
    return userRepository.existsByUsername(username) || userRepository.existsByEmail(email);
  }

  public void saveEntry(User user) {
    userRepository.save(user);
  }
}
