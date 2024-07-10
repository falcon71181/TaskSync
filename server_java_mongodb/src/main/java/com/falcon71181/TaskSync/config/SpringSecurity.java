package com.falcon71181.TaskSync.config;

import com.falcon71181.TaskSync.config.JWTAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    // http
    // // Disable CSRF, CORS, and other security features
    // .csrf().disable()
    // .cors().disable()
    // .headers().frameOptions().disable()
    // .and()
    // // Set session creation policy to stateless
    // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    // .and()
    // // Allow all requests without authentication
    // .authorizeRequests()
    // .anyRequest().permitAll();

    http
        .csrf().disable()
        .exceptionHandling()
        // .authenticationEntryPoint(authEntryPoint)
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .requestMatchers("/users/validate").authenticated()
        .requestMatchers("/tasks/create").authenticated()
        .requestMatchers("/tasks/*/delete").authenticated()
        .requestMatchers("/tasks/*/change").authenticated()
        .anyRequest().permitAll()
        .and()
        .httpBasic();
    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public JWTAuthenticationFilter jwtAuthenticationFilter() {
    return new JWTAuthenticationFilter();
  }
}
