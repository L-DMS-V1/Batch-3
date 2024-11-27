package com.example.LearningAndDevelopment.Service;



import com.example.LearningAndDevelopment.Model.DTO.UserDTO;
import com.example.LearningAndDevelopment.Model.Employee;
import com.example.LearningAndDevelopment.Model.Manager;
import com.example.LearningAndDevelopment.Repository.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void addEmployee(@Valid UserDTO userDTO) {
        // Add employee Logic
        Employee employee = new Employee();
        employee.setAccountId(userDTO.getAccountId());
        employee.setAccountName(userDTO.getAccountName());
        employee.setUsername(userDTO.getUsername());
        employee.setEmail(userDTO.getEmail());
        employee.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Hashing password
        employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

}
