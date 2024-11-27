package com.example.LearningAndDevelopment.service;

import com.example.LearningAndDevelopment.model.TrainingRequest;
import com.example.LearningAndDevelopment.repository.TrainingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingRequestServiceImpl implements TrainingRequestService {

    private final TrainingRequestRepository trainingRequestRepository;

    @Autowired
    public TrainingRequestServiceImpl(TrainingRequestRepository trainingRequestRepository) {
        this.trainingRequestRepository = trainingRequestRepository;
    }

    @Override
    public TrainingRequest createTrainingRequest(TrainingRequest request) {
        request.setStatus("PENDING");
        request.setCreatedDate(LocalDate.now());
        return trainingRequestRepository.save(request);
    }

    @Override
    public List<TrainingRequest> getAllTrainingRequests() {
        return trainingRequestRepository.findAll();
    }

    @Override
    public Optional<TrainingRequest> getTrainingRequestById(Long id) {
        return trainingRequestRepository.findById(id);
    }

    @Override
    public Optional<TrainingRequest> updateTrainingRequestStatus(Long id, String status) {
        Optional<TrainingRequest> request = trainingRequestRepository.findById(id);
        if (request.isPresent()) {
            TrainingRequest updatedRequest = request.get();
            updatedRequest.setStatus(status);
            trainingRequestRepository.save(updatedRequest);
            return Optional.of(updatedRequest);
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteTrainingRequest(Long id) {
        if (trainingRequestRepository.existsById(id)) {
            trainingRequestRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
