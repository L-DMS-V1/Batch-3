package com.example.LearningAndDevelopment.Controller;


import com.example.LearningAndDevelopment.Model.CourseProgress;
import com.example.LearningAndDevelopment.Model.TrainingRequest;
import com.example.LearningAndDevelopment.Service.CourseProgressService;
import com.example.LearningAndDevelopment.Service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private TrainingRequestService trainingRequestService;

    @Autowired
    private CourseProgressService courseProgressService;

    @PutMapping("/acceptRequest/{id}")
    public ResponseEntity<String> acceptRequest(@PathVariable("id") Long requestId) {
        trainingRequestService.acceptRequest(requestId);
        return ResponseEntity.ok("Request accepted successfully");
    }

    @PutMapping("/rejectRequest/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable("id") Long requestId) {
        trainingRequestService.rejectRequest(requestId);
        return ResponseEntity.ok("Request rejected successfully");
    }

    @GetMapping("/getAllRequests")
    public ResponseEntity<List<TrainingRequest>> getAllRequests() {
        List<TrainingRequest> requests = trainingRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/getRequest/{requestId}")
    public ResponseEntity<TrainingRequest> getAllRequests(@PathVariable("requestId") Long requestId) {
        TrainingRequest trainingRequest = trainingRequestService.getRequestByRequestId(requestId);
        return ResponseEntity.ok(trainingRequest);
    }

    @GetMapping("/getAllCourseProgress")
    public ResponseEntity<List<CourseProgress>> getAllCourseProgress() {
        List<CourseProgress> courseProgressList = courseProgressService.getAllCourseProgress();
        return new ResponseEntity<>(courseProgressList, HttpStatus.OK);
    }
}