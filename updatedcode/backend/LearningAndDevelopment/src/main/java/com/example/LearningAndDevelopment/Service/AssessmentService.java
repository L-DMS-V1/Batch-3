package com.example.LearningAndDevelopment.Service;


import com.example.LearningAndDevelopment.Model.*;
import com.example.LearningAndDevelopment.Model.DTO.AssessmentDTO;
import com.example.LearningAndDevelopment.Model.DTO.AssessmentQuestionDTO;
import com.example.LearningAndDevelopment.Model.DTO.AssessmentSubmissionDTO;
import com.example.LearningAndDevelopment.Repository.*;
import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AssessmentQuestionRepository assessmentQuestionRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseAssignmentRepository courseAssignmentRepository;

    @Autowired
    private CourseProgressService courseProgressService;

    @Autowired
    private EmployeeAssessmentRepository employeeAssessmentRepository;

    @Autowired
    private CourseProgressRepository courseProgressRepository;

    public void createAssessment(AssessmentDTO assessmentDTO) {
        // Convert AssessmentDTO to Assessment entity
        Assessment assessment = new Assessment();
        Course course = courseRepository.findById(assessmentDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        assessment.setCourse(course);
        assessment.setTotalMarks(assessmentDTO.getTotalMarks());
        assessment.setPassingMarks(assessmentDTO.getPassingMarks());
        assessment.setDuration(assessmentDTO.getDuration());

        List<AssessmentQuestion> assessmentQuestions = new ArrayList<>();
        for (AssessmentQuestionDTO assessmentQuestionDTO : assessmentDTO.getQuestions()){
            AssessmentQuestion assessmentQuestion = new AssessmentQuestion(assessmentQuestionDTO);
            assessmentQuestionRepository.save(assessmentQuestion);
            assessmentQuestions.add(assessmentQuestion);
        }
        assessment.setQuestions(assessmentQuestions);

        // Save the assessment in the database
        assessmentRepository.save(assessment);
    }

    public Assessment getAssessment(Long courseId) {
        Optional<Assessment> assessment = assessmentRepository.findByCourseCourseId(courseId);
        return assessment.orElse(null);
    }

    public List<Assessment> getAllAssessment() {
        return assessmentRepository.findAll();
    }

    public void updateAssessment(AssessmentDTO assessmentDTO) {
        Optional<Assessment> assessmentOpt = assessmentRepository.findByCourseCourseId(assessmentDTO.getCourseId());
        if (assessmentOpt.isPresent()) {
            Assessment assessment = assessmentOpt.get();
            assessment.setTotalMarks(assessmentDTO.getTotalMarks());
            assessment.setPassingMarks(assessmentDTO.getPassingMarks());
            assessment.setDuration(assessmentDTO.getDuration());

            List<AssessmentQuestion> assessmentQuestions = new ArrayList<>();
            for (AssessmentQuestionDTO assessmentQuestionDTO : assessmentDTO.getQuestions()){
                AssessmentQuestion assessmentQuestion = new AssessmentQuestion(assessmentQuestionDTO);
                assessmentQuestionRepository.save(assessmentQuestion);
                assessmentQuestions.add(assessmentQuestion);
            }
            assessment.setQuestions(assessmentQuestions);

            // Save the assessment in the database
            assessmentRepository.save(assessment);
        } else {
            throw new RuntimeException("Assessment not found");
        }
    }

    public String evaluateAssessment(AssessmentSubmissionDTO submissionDTO) {
        // Scoring Logic
        // Fetch the assessment using the assessmentId
        Assessment assessment = assessmentRepository.findById(submissionDTO.getAssessmentId())
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        List<String> answers = submissionDTO.getAnswers();
        List<AssessmentQuestion> assessmentQuestions = assessment.getQuestions();
        int score = 0;
        String result = "";
        for (int i = 0; i < answers.size(); i++) {
            if(answers.get(i).equals(assessmentQuestions.get(i).getCorrectOption()))
                score++;
        }

        if (score >= assessment.getPassingMarks()){
            result = "Congratulations!! Assessment Cleared Successfully!!";
            Optional<CourseProgress> courseProgressOpt = courseProgressRepository.findByEmployeeEmployeeIdAndCourseCourseId(submissionDTO.getEmployeeId(), assessment.getCourse().getCourseId());
            if(courseProgressOpt.isPresent()) {
                CourseProgress courseProgress = courseProgressOpt.get();
                courseProgress.setStatus("COMPLETED");
                courseProgressRepository.save(courseProgress);
                Optional<CourseAssignment> courseAssignmentOpt = courseAssignmentRepository.findByEmployeeEmployeeIdAndCourseCourseId(
                        courseProgress.getEmployee().getEmployeeId(),
                        courseProgress.getCourse().getCourseId()
                );
                if (courseAssignmentOpt.isPresent()){
                    CourseAssignment courseAssignment = courseAssignmentOpt.get();
                    courseAssignment.setStatus("COMPLETED");
                    courseAssignmentRepository.save(courseAssignment);
                } else
                    throw new RuntimeException("CourseAssignment is not found");
            } else
                throw new RuntimeException("courseProgress is not found");
        }
        else{
            result = "We're sorry!! You could not pass the Assessment";
            Optional<CourseProgress> courseProgressOpt = courseProgressRepository.findByEmployeeEmployeeIdAndCourseCourseId(submissionDTO.getEmployeeId(), assessment.getCourse().getCourseId());
            if(courseProgressOpt.isPresent()) {
                CourseProgress courseProgress = courseProgressOpt.get();
                courseProgress.setProgressPercentage(0L);
                courseProgressRepository.save(courseProgress);
            }
        }

        //Recording the Assessment
        EmployeeAssessment employeeAssessment = new EmployeeAssessment();
        Optional<Employee> employeeOpt = employeeRepository.findById(submissionDTO.getEmployeeId());
        employeeOpt.ifPresent(employeeAssessment::setEmployee);
        employeeAssessment.setAssessment(assessment);
        employeeAssessment.setResult(score >= assessment.getPassingMarks() ? AssessmentResult.PASS : AssessmentResult.FAIL);
        employeeAssessment.setScore(score);
        employeeAssessment.setAttemptedDate(LocalDateTime.now());
        employeeAssessmentRepository.save(employeeAssessment);

        return result;
    }

    public List<EmployeeAssessment> getAssessmentsByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        return employeeAssessmentRepository.findByEmployeeEmployeeId(employee.getEmployeeId());
    }
}