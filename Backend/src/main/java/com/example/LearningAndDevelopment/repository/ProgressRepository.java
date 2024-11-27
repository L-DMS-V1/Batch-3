package com.example.LearningAndDevelopment.repository;

import com.example.LearningAndDevelopment.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByAssignment_Id(Long assignmentId); // Find progress by assignment ID
}
