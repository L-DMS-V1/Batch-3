package com.example.LearningAndDevelopment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "feedback_text", nullable = false)
    private String feedbackText;

    @Column(nullable = false)
    private int rating;

    @Column(name = "submitted_by", nullable = false)
    private String submittedBy;
}
