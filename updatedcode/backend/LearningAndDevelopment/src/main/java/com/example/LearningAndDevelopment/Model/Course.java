package com.example.LearningAndDevelopment.Model;



import jakarta.persistence.*;

@Entity
@Table(name = "CourseTable1")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long courseId;

    @Column(name = "course_Name", unique = true)
    private String courseName;

    @Column(name = "key_Concepts")
    private String keyConcepts;

    @Column(name = "duration")
    private String duration;

    @Column(name = "resource_links")
    private String resourceLinks;

    @Column(name = "other_Links")
    private String otherLinks;

    @Column(name = "outcomes")
    private String outcomes;

    @ManyToOne
    @JoinColumn(name = "requestId", referencedColumnName = "requestId")
    private TrainingRequest trainingRequest;

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getKeyConcepts() {
        return keyConcepts;
    }

    public void setKeyConcepts(String keyConcepts) {
        this.keyConcepts = keyConcepts;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getResourceLinks() {
        return resourceLinks;
    }

    public void setResourceLinks(String resourceLinks) {
        this.resourceLinks = resourceLinks;
    }

    public String getOtherLinks() {
        return otherLinks;
    }

    public void setOtherLinks(String otherLinks) {
        this.otherLinks = otherLinks;
    }

    public String getOutcomes() {
        return outcomes;
    }

    public void setOutcomes(String outcomes) {
        this.outcomes = outcomes;
    }

    public TrainingRequest getTrainingRequest() {
        return trainingRequest;
    }

    public void setTrainingRequest(TrainingRequest trainingRequest) {
        this.trainingRequest = trainingRequest;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", keyConcepts='" + keyConcepts + '\'' +
                ", duration='" + duration + '\'' +
                ", resourceLinks='" + resourceLinks + '\'' +
                ", otherLinks='" + otherLinks + '\'' +
                ", outcomes='" + outcomes + '\'' +
                '}';
    }
}
