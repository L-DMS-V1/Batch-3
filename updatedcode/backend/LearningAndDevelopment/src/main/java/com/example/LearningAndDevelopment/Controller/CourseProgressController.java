package com.example.LearningAndDevelopment.Controller;



import com.example.LearningAndDevelopment.Model.CourseAssignment;
import com.example.LearningAndDevelopment.Model.CourseProgress;
import com.example.LearningAndDevelopment.Model.DTO.CourseProgressDTO;
import com.example.LearningAndDevelopment.Service.CourseProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('EMPLOYEE')")
@RequestMapping("/api/course-progress")
public class CourseProgressController {

    @Autowired
    private CourseProgressService courseProgressService;

    @GetMapping("/getCourseProgress")
    public ResponseEntity<List<CourseProgress>> getCourseProgress() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<CourseProgress> listOfCourseProgress  = courseProgressService.getCourseProgress(username);
        return new ResponseEntity<>(listOfCourseProgress, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCourseProgress(@RequestBody CourseProgressDTO courseProgressDTO) {
        courseProgressService.updateCourseProgress(courseProgressDTO);
        return new ResponseEntity<>("CourseProgress Updated Successfully", HttpStatus.OK);
    }

}