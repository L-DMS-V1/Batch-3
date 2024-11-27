package com.example.LearningAndDevelopment.Repository;



import com.example.LearningAndDevelopment.Model.AssessmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Long> {
//    List<AssessmentQuestion> findByAssessmentAssessmentId(Long assessmentId);
}
