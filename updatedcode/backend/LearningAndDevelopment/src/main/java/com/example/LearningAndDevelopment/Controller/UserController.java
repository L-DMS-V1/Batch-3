package com.example.LearningAndDevelopment.Controller;



import com.example.LearningAndDevelopment.Model.DTO.LoginDTO;
import com.example.LearningAndDevelopment.Model.DTO.UserDTO;
import com.example.LearningAndDevelopment.Service.JWTService;
import com.example.LearningAndDevelopment.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO) {
        userService.createUser(userDTO);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginDTO loginDTO) {
        String response = userService.login(loginDTO);
        if (response.equals("Login Successful")) {
            // Generate JWT token after successful login
            String token = jwtService.generateToken(loginDTO.getUsername()); // Assuming username is the subject

                   return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(token);

//            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response.equals("User Not Found")) {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminAccess() {
        return "Welcome, Admin!";
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping("/manager")
    public String managerAccess() {
        return "Welcome, Manager!";
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/employee")
    public String employeeAccess() {
        return "Welcome, Employee!";
    }

}