package com.example.LearningAndDevelopment.Service;

import com.example.LearningAndDevelopment.Model.Course;
import com.example.LearningAndDevelopment.Model.CourseAssignment;
import com.example.LearningAndDevelopment.Model.DTO.CourseAssignmentDTO;
import com.example.LearningAndDevelopment.Model.DTO.CourseProgressDTO;
import com.example.LearningAndDevelopment.Model.Employee;
import com.example.LearningAndDevelopment.Repository.CourseAssignmentRepository;
import com.example.LearningAndDevelopment.Repository.CourseRepository;
import com.example.LearningAndDevelopment.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseAssignmentService {

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseProgressService courseProgressService;

    public CourseAssignment assignCourse(CourseAssignmentDTO courseAssignmentDTO) {
        CourseAssignment courseAssignment = new CourseAssignment();

        Optional<Course> courseOpt = courseRepository.findByCourseId(courseAssignmentDTO.getCourseId());
        courseOpt.ifPresent(courseAssignment::setCourse);
        courseOpt.ifPresent(course -> courseAssignment.setCourseDuration(course.getDuration()));

        Optional<Employee> employeeOpt = employeeRepository.findByEmployeeId(courseAssignmentDTO.getEmployeeId());
        employeeOpt.ifPresent(courseAssignment::setEmployee);

        courseAssignment.setStatus(courseAssignmentDTO.getStatus());
        courseAssignment.setDeadline(courseAssignmentDTO.getDeadline());

        // Creating a CourseProgress with 0 Progress
        CourseProgressDTO courseProgressDTO = new CourseProgressDTO();
        employeeOpt.ifPresent(employee -> courseProgressDTO.setEmployeeId(employee.getEmployeeId()));
        courseOpt.ifPresent(course -> courseProgressDTO.setCourseId(course.getCourseId()));
        courseProgressDTO.setProgressPercentage(0L);
        courseProgressDTO.setStatus(courseAssignmentDTO.getStatus());
        courseProgressService.updateCourseProgress(courseProgressDTO);

        return courseAssignmentRepository.save(courseAssignment);
    }

    public List<CourseAssignment> getAllAssignments() {
        return courseAssignmentRepository.findAll();
    }

    public CourseAssignment updateAssignmentStatus(Long assignmentId, String status) {
        CourseAssignment assignment = courseAssignmentRepository.findById(assignmentId).orElse(null);
        if (assignment != null) {
            assignment.setStatus(status);
            return courseAssignmentRepository.save(assignment);
        }
        return null;
    }

    public List<CourseAssignment> getAssignmentsByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        return courseAssignmentRepository.findByEmployeeEmployeeId(employee.getEmployeeId());
    }

    // New method to get employees assigned to a specific course
    public List<Employee> getAssignedEmployeesByCourseId(Long courseId) {
        // Find course by courseId
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (courseOpt.isPresent()) {
            Course course = courseOpt.get();
            // Find all assignments for the course
            List<CourseAssignment> assignments = courseAssignmentRepository.findByCourse(course);
            // Extract employee details from the assignments
            return assignments.stream()
                    .map(CourseAssignment::getEmployee)  // Get employee for each assignment
                    .collect(Collectors.toList());  // Return list of employees
        }
        return Collections.emptyList();  // Return empty list if course is not found
    }
}
