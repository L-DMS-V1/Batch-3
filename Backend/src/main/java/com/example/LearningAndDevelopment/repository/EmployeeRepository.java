package com.example.LearningAndDevelopment.repository;

import com.example.LearningAndDevelopment.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

