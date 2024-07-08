// package com.falcon71181.TaskSync.config;
//
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;
//
// import java.io.IOException;
//
// import org.springframework.lang.NonNull;
//
// import com.falcon71181.TaskSync.models.User;
// import com.falcon71181.TaskSync.service.impl.JWTServiceImpl;
//
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
//
// /**
// * JWTAuthenticationFilter
// */
// @Component
// public class JWTAuthenticationFilter extends OncePerRequestFilter {
// private final JWTServiceImpl jwtService;
//
// private final User user;
//
// @Override
// protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull
// HttpServletResponse response,
// @NonNull FilterChain filterChain) throws ServletException, IOException {
// final String authHeader = request.getHeader("Authorization");
// final String jwt;
// final String userEmail;
//
// // Invalid JWT Token
// if (authHeader == null || !authHeader.startsWith("Bearer ")) {
// filterChain.doFilter(request, response);
// return;
// }
//
// jwt = authHeader.substring(7);
// // userEmail = jwtService.extra // Extract email from jwt
// }
// }
