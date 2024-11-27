package com.example.LearningAndDevelopment.controller;

import com.example.LearningAndDevelopment.model.TrainingRequest;
import com.example.LearningAndDevelopment.service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainingRequests")
public class TrainingRequestController {

    private final TrainingRequestService trainingRequestService;

    @Autowired
    public TrainingRequestController(TrainingRequestService trainingRequestService) {
        this.trainingRequestService = trainingRequestService;
    }

    @PostMapping("/create")
    public ResponseEntity<TrainingRequest> createTrainingRequest(@RequestBody TrainingRequest request) {
        TrainingRequest createdRequest = trainingRequestService.createTrainingRequest(request);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TrainingRequest>> getAllTrainingRequests() {
        List<TrainingRequest> requests = trainingRequestService.getAllTrainingRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingRequest> getTrainingRequestById(@PathVariable Long id) {
        Optional<TrainingRequest> request = trainingRequestService.getTrainingRequestById(id);
        return request.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TrainingRequest> updateTrainingRequestStatus(@PathVariable Long id, @RequestBody TrainingRequest updatedRequest) {
        Optional<TrainingRequest> request = trainingRequestService.updateTrainingRequestStatus(id, updatedRequest.getStatus());
        return request.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTrainingRequest(@PathVariable Long id) {
        boolean deleted = trainingRequestService.deleteTrainingRequest(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
