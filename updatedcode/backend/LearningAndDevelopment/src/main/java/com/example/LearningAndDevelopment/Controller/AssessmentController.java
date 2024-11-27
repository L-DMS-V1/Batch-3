package com.example.LearningAndDevelopment.Controller;



import com.example.LearningAndDevelopment.Model.Assessment;
import com.example.LearningAndDevelopment.Model.DTO.AssessmentDTO;
import com.example.LearningAndDevelopment.Model.DTO.AssessmentSubmissionDTO;
import com.example.LearningAndDevelopment.Service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createAssessment(@RequestBody AssessmentDTO assessmentDTO) {
        assessmentService.createAssessment(assessmentDTO);
        return new ResponseEntity<>("Assessment created successfully", HttpStatus.CREATED);
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateAssessment(@RequestBody AssessmentDTO assessmentDTO) {
        assessmentService.updateAssessment(assessmentDTO);
        return new ResponseEntity<>("Assessment updated successfully", HttpStatus.CREATED);
    }

    @GetMapping("/getAllAssessments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        List<Assessment> assessmentList =  assessmentService.getAllAssessment();
        return new ResponseEntity<>(assessmentList, HttpStatus.CREATED);
    }

    @GetMapping("/getAssessment/{courseId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<Assessment> getAssessment(@PathVariable("courseId") Long courseId) {
        Assessment assessment = assessmentService.getAssessment(courseId);
        return new ResponseEntity<>(assessment,HttpStatus.OK);
    }

    @PostMapping("/submit")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<String> submitAssessment(@RequestBody AssessmentSubmissionDTO submissionDTO) {
        String result = assessmentService.evaluateAssessment(submissionDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}