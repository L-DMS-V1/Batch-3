package com.example.LearningAndDevelopment.Model.DTO;



import jakarta.validation.constraints.NotBlank;

public class CourseDTO {

    @NotBlank(message = "Course Name is mandatory")
    private String courseName;

    @NotBlank(message = "Course Name is mandatory")
    private String keyConcepts;

    @NotBlank(message = "Duration is mandatory")
    private String duration;

    @NotBlank(message = "Resource Links are mandatory")
    private String resourceLinks;

    private String otherLinks;

    @NotBlank(message = "Outcomes are mandatory")
    private String outcomes;

    public @NotBlank(message = "Course Name is mandatory") String getCourseName() {
        return courseName;
    }

    public void setCourseName(@NotBlank(message = "Course Name is mandatory") String courseName) {
        this.courseName = courseName;
    }

    public @NotBlank(message = "Course Name is mandatory") String getKeyConcepts() {
        return keyConcepts;
    }

    public void setKeyConcepts(@NotBlank(message = "Course Name is mandatory") String keyConcepts) {
        this.keyConcepts = keyConcepts;
    }

    public @NotBlank(message = "Duration is mandatory") String getDuration() {
        return duration;
    }

    public void setDuration(@NotBlank(message = "Duration is mandatory") String duration) {
        this.duration = duration;
    }

    public @NotBlank(message = "Resource Links are mandatory") String getResourceLinks() {
        return resourceLinks;
    }

    public void setResourceLinks(@NotBlank(message = "Resource Links are mandatory") String resourceLinks) {
        this.resourceLinks = resourceLinks;
    }

    public String getOtherLinks() {
        return otherLinks;
    }

    public void setOtherLinks(String otherLinks) {
        this.otherLinks = otherLinks;
    }

    public @NotBlank(message = "Outcomes are mandatory") String getOutcomes() {
        return outcomes;
    }

    public void setOutcomes(@NotBlank(message = "Outcomes are mandatory") String outcomes) {
        this.outcomes = outcomes;
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                "courseName='" + courseName + '\'' +
                ", keyConcepts='" + keyConcepts + '\'' +
                ", duration='" + duration + '\'' +
                ", resourceLinks='" + resourceLinks + '\'' +
                ", otherLinks='" + otherLinks + '\'' +
                ", outcomes='" + outcomes + '\'' +
                '}';
    }
}