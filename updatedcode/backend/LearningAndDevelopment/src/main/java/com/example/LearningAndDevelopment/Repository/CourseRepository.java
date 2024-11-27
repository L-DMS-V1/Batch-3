package com.example.LearningAndDevelopment.Repository;



import com.example.LearningAndDevelopment.Model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseName(String courseName);
    Optional<Course> findByCourseId(Long courseId);
    void deleteByCourseId(Long courseId);
}
