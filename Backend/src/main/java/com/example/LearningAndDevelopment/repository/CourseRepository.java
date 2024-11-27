package com.example.LearningAndDevelopment.repository;

import com.example.LearningAndDevelopment.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
