package com.example.LearningAndDevelopment.controller;

import com.example.LearningAndDevelopment.model.Course;
import com.example.LearningAndDevelopment.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody @Valid Course course) {
        return courseService.createCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody @Valid Course course) {
        Course existingCourse = courseService.getCourseById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
        existingCourse.setName(course.getName());
        existingCourse.setLevel(course.getLevel());
        existingCourse.setDuration(course.getDuration());
        existingCourse.setDescription(course.getDescription());
        return courseService.createCourse(existingCourse);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}
