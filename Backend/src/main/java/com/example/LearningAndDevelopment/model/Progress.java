package com.example.LearningAndDevelopment.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    private Assignment assignment;

    private int completionPercentage; // Progress percentage: 0-100

    private LocalDate lastUpdated = LocalDate.now(); // Date of the latest progress update
}
