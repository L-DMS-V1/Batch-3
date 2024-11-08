package com.example.LearningAndDevelopment.service;

import com.example.LearningAndDevelopment.model.TrainingRequest;
import com.example.LearningAndDevelopment.service.TrainingRequestService;
import com.example.LearningAndDevelopment.repository.TrainingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingRequestServiceImpl implements TrainingRequestService {

    @Autowired
    private TrainingRequestRepository trainingRequestRepository;

    @Override
    public TrainingRequest save(TrainingRequest trainingRequest) {
        return trainingRequestRepository.save(trainingRequest);
    }

    @Override
    public List<TrainingRequest> getAllRequests() {
        return trainingRequestRepository.findAll();
    }

    @Override
    public TrainingRequest getRequestById(Long id) {
        return trainingRequestRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteRequest(Long id) {
        trainingRequestRepository.deleteById(id);
    }
}
