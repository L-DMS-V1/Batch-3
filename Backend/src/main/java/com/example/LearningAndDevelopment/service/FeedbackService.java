package com.example.LearningAndDevelopment.service;

import com.example.LearningAndDevelopment.model.Feedback;
import com.example.LearningAndDevelopment.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found!"));
    }

    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
        Feedback feedback = getFeedbackById(id);
        feedback.setFeedbackText(updatedFeedback.getFeedbackText());
        feedback.setRating(updatedFeedback.getRating());
        feedback.setSubmittedBy(updatedFeedback.getSubmittedBy());
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    public Map<Integer, Long> getFeedbackRatingDistribution() {
        return feedbackRepository.findAll().stream()
                .collect(Collectors.groupingBy(Feedback::getRating, Collectors.counting()));
    }
}
