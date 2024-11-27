package com.example.LearningAndDevelopment.Service;

import com.example.LearningAndDevelopment.Model.Users;
import com.example.LearningAndDevelopment.Repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.cache.interceptor.SimpleKeyGenerator.generateKey;

@Service
public class JWTService {

    // Hardcoded secret key (make sure it's base64-encoded for compatibility)
    private static final String BASE64_SECRET_KEY = "3hRkY5F30Q9aE1/oRVFwT8N1DW3B/9+8OS1lDFGhfzs=";

    private Key key;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(JWTService.class);

    public JWTService() {
        this.key = Keys.hmacShaKeyFor(BASE64_SECRET_KEY.getBytes()); // Generate key on instantiation
    }

    public String generateToken(String subject) {

        // Fetching role
        Optional<Users> userOpt = userRepository.findByUsername(subject);
        Users user = userOpt.get();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ROLE_" + user.getRole());

        return Jwts.builder()
                .setClaims(claims) // Add custom claims
                .setSubject(subject) // Set the subject (usually user ID or username)
                .setIssuedAt(new Date()) // Set the issue time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token validity for 10 hours
                .signWith(key, SignatureAlgorithm.HS256) // Sign with the secret key using HS256 algorithm
                .compact(); // Return the generated token
    }

    public Key getKey() {
        return this.key;
    }

    private Key generateKey() {
        return Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a key for HS256 algorithm
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);  // Extract all claims
        return claimsResolver.apply(claims);  // Apply the function to retrieve the specific claim
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)  // Use the generated key for parsing
                .build()
                .parseClaimsJws(token)
                .getBody();  // Get the claims from the JWT
    }

    // Validate the token (Check if the token is valid and not expired)
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);  // Extract the email from the token
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));  // Validate if the email matches and token is not expired
    }

    // Check if the token has expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());  // Compare the expiration date with the current date
    }

    // Extract the expiration date from the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);  // Extract the expiration claim
    }

    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
        return (String) claims.get("role");
    }
}
