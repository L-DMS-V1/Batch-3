package com.example.LearningAndDevelopment.service;

import com.example.LearningAndDevelopment.model.TrainingRequest;

import java.util.List;
import java.util.Optional;

public interface TrainingRequestService {
    TrainingRequest createTrainingRequest(TrainingRequest request);
    List<TrainingRequest> getAllTrainingRequests();
    Optional<TrainingRequest> getTrainingRequestById(Long id);
    Optional<TrainingRequest> updateTrainingRequestStatus(Long id, String status);
    boolean deleteTrainingRequest(Long id);
}
