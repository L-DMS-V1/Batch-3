package com.example.LearningAndDevelopment.repository;

import com.example.LearningAndDevelopment.model.TrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRequestRepository extends JpaRepository<TrainingRequest, Long> {
    // Additional custom queries can be defined here if needed
}
