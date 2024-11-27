package com.example.LearningAndDevelopment.Service;


import com.example.LearningAndDevelopment.Model.Course;
import com.example.LearningAndDevelopment.Model.DTO.CourseDTO;
import com.example.LearningAndDevelopment.Model.TrainingRequest;
import com.example.LearningAndDevelopment.Repository.CourseRepository;
import com.example.LearningAndDevelopment.Repository.TrainingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Course createCourse(Long requestId, CourseDTO courseDTO) {
        Course course = new Course();
        course.setCourseName(courseDTO.getCourseName());
        course.setKeyConcepts(courseDTO.getKeyConcepts());
        course.setDuration(courseDTO.getDuration());
        course.setResourceLinks(courseDTO.getResourceLinks());
        course.setOtherLinks(courseDTO.getOtherLinks());
        course.setOutcomes(courseDTO.getOutcomes());

        TrainingRequest trainingRequest = trainingRepository.findByRequestId(requestId);
        course.setTrainingRequest(trainingRequest);
        courseRepository.save(course);
        return course;
    }

    public Course getCourseById(Long courseId) {
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        return courseOpt.orElse(null);  // This is functional style expression
    }

    public Course getCourseByName(String courseName) {
        Optional<Course> courseOpt = courseRepository.findByCourseName(courseName);
        return courseOpt.orElse(null);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course updateCourse(Long courseId, CourseDTO courseDTO) {
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (courseOpt.isPresent()) {
            Course courseToUpdate = courseOpt.get();
            courseToUpdate.setCourseName(courseDTO.getCourseName());
            courseToUpdate.setKeyConcepts(courseDTO.getKeyConcepts());
            courseToUpdate.setDuration(courseDTO.getDuration());
            courseToUpdate.setResourceLinks(courseDTO.getResourceLinks());
            courseToUpdate.setOtherLinks(courseDTO.getOtherLinks());
            courseToUpdate.setOutcomes(courseDTO.getOutcomes());
            courseRepository.save(courseToUpdate);
            return courseToUpdate;
        }else {
            return null;
        }
    }

    @Transactional
    public String deleteCourse(Long courseId) {
        Optional<Course> courseOpt = courseRepository.findByCourseId(courseId);
        if (courseOpt.isPresent()) {
            courseRepository.deleteByCourseId(courseId);
            return "Course Deletion Complete";
        }else {
            return "Course Not Found";
        }
    }

}
