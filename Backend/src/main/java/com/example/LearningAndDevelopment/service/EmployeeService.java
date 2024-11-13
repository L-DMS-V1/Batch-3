package com.example.LearningAndDevelopment.service;


import com.example.LearningAndDevelopment.model.Employee;
import com.example.LearningAndDevelopment.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add a new Employee or update an existing one
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get an Employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Delete an Employee by ID
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
