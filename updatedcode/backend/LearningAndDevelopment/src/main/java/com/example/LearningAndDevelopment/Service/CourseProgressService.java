package com.example.LearningAndDevelopment.Service;



import com.example.LearningAndDevelopment.Model.Course;
import com.example.LearningAndDevelopment.Model.CourseAssignment;
import com.example.LearningAndDevelopment.Model.CourseProgress;
import com.example.LearningAndDevelopment.Model.DTO.CourseProgressDTO;
import com.example.LearningAndDevelopment.Model.Employee;
import com.example.LearningAndDevelopment.Filter.JWTFilter;
import com.example.LearningAndDevelopment.Repository.CourseAssignmentRepository;
import com.example.LearningAndDevelopment.Repository.CourseProgressRepository;
import com.example.LearningAndDevelopment.Repository.CourseRepository;
import com.example.LearningAndDevelopment.Repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CourseProgressService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseProgressRepository courseProgressRepository;

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    private static final Logger logger = LoggerFactory.getLogger(CourseProgressService.class);


    public void updateCourseProgress(CourseProgressDTO courseProgressDTO) {
        Optional<CourseProgress> courseProgressOpt = courseProgressRepository.findByEmployeeEmployeeIdAndCourseCourseId(courseProgressDTO.getEmployeeId(), courseProgressDTO.getCourseId());

        if (courseProgressOpt.isPresent()) {
            CourseProgress courseProgress = courseProgressOpt.get();
            courseProgress.setProgressPercentage(courseProgressDTO.getProgressPercentage());
            courseProgress.setStatus(courseProgressDTO.getStatus());
            courseProgress.setLastAccessedDate(LocalDateTime.now());
            courseProgressRepository.save(courseProgress);
        } else {
            CourseProgress courseProgress = new CourseProgress();

            Optional<Course> courseOpt = courseRepository.findByCourseId(courseProgressDTO.getCourseId());
            courseOpt.ifPresent(courseProgress::setCourse);

            Optional<Employee> employeeOpt = employeeRepository.findByEmployeeId(courseProgressDTO.getEmployeeId());
            employeeOpt.ifPresent(courseProgress::setEmployee);

            courseProgress.setProgressPercentage(courseProgressDTO.getProgressPercentage());
            courseProgress.setStatus(courseProgressDTO.getStatus());
            courseProgress.setLastAccessedDate(LocalDateTime.now());
            courseProgressRepository.save(courseProgress);
        }
    }

    public List<CourseProgress> getCourseProgress(String username) {
        List<CourseProgress> courseProgressList = courseProgressRepository.findByEmployeeUsername(username);
        logger.info("Course progress retrieved: {}", courseProgressList);
        return courseProgressList;
    }

    public List<CourseProgress> getAllCourseProgress() {
        return courseProgressRepository.findAll();
    }
}
