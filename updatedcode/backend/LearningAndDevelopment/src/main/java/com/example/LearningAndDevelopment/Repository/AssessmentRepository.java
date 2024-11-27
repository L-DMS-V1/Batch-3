package com.example.LearningAndDevelopment.Repository;



import com.example.LearningAndDevelopment.Model.Assessment;
import com.example.LearningAndDevelopment.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    Optional<Assessment> findByCourseCourseId(Long courseId);

}
