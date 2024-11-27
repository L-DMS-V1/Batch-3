package com.example.LearningAndDevelopment.Repository;



import com.example.LearningAndDevelopment.Model.Course;
import com.example.LearningAndDevelopment.Model.CourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Long> {
    List<CourseAssignment> findByEmployeeEmployeeId(Long employeeId);
    List<CourseAssignment> findByCourse(Course course);
    Optional<CourseAssignment> findByEmployeeEmployeeIdAndCourseCourseId(Long employeeId, Long courseId);
}
