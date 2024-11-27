package com.example.LearningAndDevelopment.Service;

import com.example.LearningAndDevelopment.Model.DTO.LoginDTO;
import com.example.LearningAndDevelopment.Model.DTO.UserDTO;
import com.example.LearningAndDevelopment.Model.Users;
import com.example.LearningAndDevelopment.Repository.ManagerRepository;
import com.example.LearningAndDevelopment.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ManagerService managerService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createUser(@Valid UserDTO userDTO) {
        Users user = new Users();
        user.setAccountId(userDTO.getAccountId());
        user.setAccountName(userDTO.getAccountName());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Hashing the password
        user.setRole(userDTO.getRole());
        userRepository.save(user);
        if(userDTO.getRole().equals("MANAGER")){
            managerService.addManager(userDTO);
        } else if(userDTO.getRole().equals("EMPLOYEE")) {
            employeeService.addEmployee(userDTO);
        }
    }

    public String login(LoginDTO loginDTO) {
        Optional<Users> userOpt = userRepository.findByUsername(loginDTO.getUsername());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) { // Check hashed password
                return "Login Successful";
            } else {
                return "Invalid Credentials";
            }
        } else {
            return "User Not Found";
        }
    }
}
