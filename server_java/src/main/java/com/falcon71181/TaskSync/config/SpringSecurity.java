package com.falcon71181.TaskSync.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    http
        // Disable CSRF, CORS, and other security features
        .csrf().disable()
        .cors().disable()
        .headers().frameOptions().disable()
        .and()
        // Set session creation policy to stateless
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        // Allow all requests without authentication
        .authorizeRequests()
        .anyRequest().permitAll();

    return http.build();
  }
}
