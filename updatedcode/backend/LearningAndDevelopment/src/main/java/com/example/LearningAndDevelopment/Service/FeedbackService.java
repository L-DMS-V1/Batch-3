package com.example.LearningAndDevelopment.Service;


import com.example.LearningAndDevelopment.Model.Course;
import com.example.LearningAndDevelopment.Model.DTO.FeedbackDTO;
import com.example.LearningAndDevelopment.Model.Employee;
import com.example.LearningAndDevelopment.Model.Feedback;
import com.example.LearningAndDevelopment.Filter.JWTFilter;
import com.example.LearningAndDevelopment.Repository.CourseRepository;
import com.example.LearningAndDevelopment.Repository.EmployeeRepository;
import com.example.LearningAndDevelopment.Repository.FeedbackRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    private static final Logger logger = LoggerFactory.getLogger(FeedbackService.class);

    public Feedback submitFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();

        // Find employee and set to feedback
        Optional<Employee> employeeOpt = employeeRepository.findByEmployeeId(feedbackDTO.getEmployeeId());
        employeeOpt.ifPresent(feedback::setEmployee);

        // Find course and set to feedback, log details
        Optional<Course> courseOpt = courseRepository.findByCourseId(feedbackDTO.getCourseId());
        courseOpt.ifPresent(course -> {
            feedback.setCourse(course);
            logger.info("Course Details - ID: {}, Name: {}, Description: {}",
                    course.getCourseId(),
                    course.getCourseName(),
                    course.getKeyConcepts()); // Update attributes as per Course fields
        });

        // Log courseId from DTO
        logger.info("Submitted courseId: {}", feedbackDTO.getCourseId());

        // Set other feedback details
        feedback.setRating(feedbackDTO.getRating());
        feedback.setFeedBackEnum(feedbackDTO.getFeedBackEnum());
        feedback.setComment(feedbackDTO.getComment());

        // Save feedback and return
        return feedbackRepository.save(feedback);
    }


    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
