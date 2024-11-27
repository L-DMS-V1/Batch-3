package com.example.LearningAndDevelopment.login.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private com.example.LearningAndDevelopment.login.model.ERole name;

    public Role() {

    }

    public Role(com.example.LearningAndDevelopment.login.model.ERole name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public com.example.LearningAndDevelopment.login.model.ERole getName() {
        return name;
    }

    public void setName(com.example.LearningAndDevelopment.login.model.ERole name) {
        this.name = name;
    }
}