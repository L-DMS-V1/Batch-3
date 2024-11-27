package com.example.LearningAndDevelopment.Repository;


import com.example.LearningAndDevelopment.Model.EmployeeAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmployeeAssessmentRepository extends JpaRepository<EmployeeAssessment, Long> {
    List<EmployeeAssessment> findByEmployeeEmployeeId(Long employeeId);
}