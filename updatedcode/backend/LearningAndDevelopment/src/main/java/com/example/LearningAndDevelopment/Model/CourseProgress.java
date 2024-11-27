package com.example.LearningAndDevelopment.Model;



import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Course_Progress_Table1")
public class CourseProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    @ManyToOne
    @JoinColumn(name = "courseId", referencedColumnName = "courseId")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId")
    private Employee employee;

    @Column(name = "progress_percentage")
    private Long progressPercentage;

    @Column(name = "status")
    private String status;

    @Column(name = "last_accessed_date")
    private LocalDateTime lastAccessedDate;

    public Long getProgressId() {
        return progressId;
    }

    public void setProgressId(Long progressId) {
        this.progressId = progressId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Long getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(Long progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLastAccessedDate() {
        return lastAccessedDate;
    }

    public void setLastAccessedDate(LocalDateTime lastAccessedDate) {
        this.lastAccessedDate = lastAccessedDate;
    }

    @Override
    public String toString() {
        return "CourseProgress{" +
                "progressId=" + progressId +
                ", courseId=" + course.getCourseId() +
                ", employeeId=" + employee.getEmployeeId() +
                ", progressPercentage=" + progressPercentage +
                ", status='" + status + '\'' +
                ", lastAccessedDate=" + lastAccessedDate +
                '}';
    }
}
