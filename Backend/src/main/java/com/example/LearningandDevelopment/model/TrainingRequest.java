package com.example.LearningAndDevelopment.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "training_requests")
public class TrainingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String concepts;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private String status;

    @Column(nullable = true)
    private LocalDate createdDate;
}
