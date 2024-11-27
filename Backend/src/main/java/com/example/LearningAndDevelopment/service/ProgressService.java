package com.example.LearningAndDevelopment.service;

import com.example.LearningAndDevelopment.model.Progress;
import com.example.LearningAndDevelopment.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // Create or update progress
    public Progress updateProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    // Get all progress records
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    // Get progress by ID
    public Optional<Progress> getProgressById(Long id) {
        return progressRepository.findById(id);
    }

    // Get progress by Assignment ID
    public List<Progress> getProgressByAssignmentId(Long assignmentId) {
        return progressRepository.findByAssignment_Id(assignmentId);
    }

    // Delete a progress record by ID
    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }
}
