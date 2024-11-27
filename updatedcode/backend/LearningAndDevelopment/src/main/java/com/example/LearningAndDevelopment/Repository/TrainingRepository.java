package com.example.LearningAndDevelopment.Repository;



import com.example.LearningAndDevelopment.Model.TrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<TrainingRequest, Long> {
    List<TrainingRequest> findByManagerUsername(String username);
    TrainingRequest findByRequestId(Long requestId);
}
