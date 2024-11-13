package com.example.LearningAndDevelopment.service;


import com.example.LearningAndDevelopment.model.Course;
import com.example.LearningAndDevelopment.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Create or update a Course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get all Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get a Course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Delete a Course by ID
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}