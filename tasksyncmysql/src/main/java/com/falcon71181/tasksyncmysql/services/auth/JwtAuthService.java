package com.falcon71181.tasksyncmysql.services.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.falcon71181.tasksyncmysql.models.User;

import java.security.Key;
import java.util.Date;

/**
 * JwtAuthService
 */
@Service
public class JwtAuthService {

  private static final Logger logger = LoggerFactory.getLogger(JwtAuthService.class);

  @Value("${tasksync.app.jwtSecret}")
  private String jwtSecret;

  @Value("${tasksync.app.jwtExpirationMs}")
  private Long jwtExpirationMs;

  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String generateToken(User user) {
    String email = user.getEmail();
    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
  }

  public String getEmailFromToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
        .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    } catch (Exception e) {
      logger.error("JWT token validation error: {}", e.getMessage());
    }

    return false;
  }
}
