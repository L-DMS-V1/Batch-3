package com.example.LearningAndDevelopment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingRequestDTO {
    private Long id;
    private String courseName;
    private String description;
    private String concepts;
    private int duration;
    private String position;
    private String status;
}
