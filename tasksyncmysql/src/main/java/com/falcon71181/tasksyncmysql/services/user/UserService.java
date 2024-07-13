package com.falcon71181.tasksyncmysql.services.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.falcon71181.tasksyncmysql.models.User;
import com.falcon71181.tasksyncmysql.repository.user.UserRepository;

/**
 * UserService
 */
@Service
public class UserService {

  UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public void saveEntry(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
  }

  public boolean existsByUsernameOrEmail(String username, String email) {
    return userRepository.existsByEmail(email) ||
        userRepository.existsByUsername(username);
  }

  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public boolean checkPassword(User user, String rawPassword) {
    return passwordEncoder.matches(rawPassword, user.getPassword());
  }
}
