package com.falcon71181.TaskSync.config;

import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.falcon71181.TaskSync.service.UserDetailsServiceImpl;
import com.falcon71181.TaskSync.service.impl.JWTServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * JWTAuthenticationFilter
 */
public class JWTAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private JWTServiceImpl jwtService;

  @Autowired
  private UserDetailsServiceImpl userDetails;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    final String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    final String jwt = authHeader.substring(7);
    String userEmail = null;

    try {
      if (jwtService.validateJwtToken(jwt)) {
        userEmail = jwtService.getEmailFromToken(jwt);
        UserDetails user = userDetails.loadUserByUsername(userEmail);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null,
            user.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // Set email as request attribute (if needed)
        request.setAttribute("email", userEmail);
      }
    } catch (Exception e) {
      // Log the exception or handle it appropriately
      SecurityContextHolder.clearContext(); // Clear the context in case of exception
      throw new ServletException("Failed to process authentication token", e);
    }

    // Proceed with the filter chain
    filterChain.doFilter(request, response);
  }
}
