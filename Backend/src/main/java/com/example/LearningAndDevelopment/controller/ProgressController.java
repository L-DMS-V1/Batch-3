package com.example.LearningAndDevelopment.controller;

import com.example.LearningAndDevelopment.model.Progress;
import com.example.LearningAndDevelopment.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Add or update progress
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Progress updateProgress(@RequestBody @Valid Progress progress) {
        return progressService.updateProgress(progress);
    }

    // Get all progress records
    @GetMapping
    public List<Progress> getAllProgress() {
        return progressService.getAllProgress();
    }

    // Get progress by ID
    @GetMapping("/{id}")
    public Progress getProgressById(@PathVariable Long id) {
        return progressService.getProgressById(id)
                .orElseThrow(() -> new RuntimeException("Progress not found with id " + id));
    }

    // Get progress by Assignment ID
    @GetMapping("/assignment/{assignmentId}")
    public List<Progress> getProgressByAssignmentId(@PathVariable Long assignmentId) {
        return progressService.getProgressByAssignmentId(assignmentId);
    }

    // Delete progress by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
    }
}


