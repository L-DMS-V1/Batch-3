package com.example.LearningAndDevelopment.Controller;

import com.example.LearningAndDevelopment.Model.DTO.FeedbackDTO;
import com.example.LearningAndDevelopment.Model.Feedback;
import com.example.LearningAndDevelopment.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback feedback = feedbackService.submitFeedback(feedbackDTO);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return new ResponseEntity<>(feedbackService.getAllFeedbacks(), HttpStatus.OK);
    }
}
