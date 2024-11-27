package com.example.LearningAndDevelopment.Controller;


import com.example.LearningAndDevelopment.Model.Course;
import com.example.LearningAndDevelopment.Model.DTO.CourseDTO;
import com.example.LearningAndDevelopment.Service.CourseService;
import com.example.LearningAndDevelopment.Service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private TrainingRequestService trainingRequestService;

    @PostMapping("/{requestId}")
    public ResponseEntity<String> createCourse(@PathVariable("requestId") Long requestId, @RequestBody CourseDTO courseDTO) {
        courseService.createCourse(requestId,courseDTO);
        trainingRequestService.updateRequest(requestId);
        return new ResponseEntity<>("Course Created Successfully", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> allCourses = courseService.getAllCourses();
        return new ResponseEntity<>(allCourses, HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getCourse(@PathVariable("courseId") Long courseId) {
        Course course = courseService.getCourseById(courseId);
        if (course != null) {
            return new ResponseEntity<>(course, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<String> updateCourse(@PathVariable Long courseId, @RequestBody CourseDTO courseDTO) {

        Course updatedCourse = courseService.updateCourse(courseId, courseDTO);
        if (updatedCourse != null) {
            return new ResponseEntity<>("Course Updated Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable("courseId") Long courseId) {
        String response = courseService.deleteCourse(courseId);
        if (response.equals("Course Deletion Complete")) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}