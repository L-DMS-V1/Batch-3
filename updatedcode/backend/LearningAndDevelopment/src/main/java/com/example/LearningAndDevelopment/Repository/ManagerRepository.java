package com.example.LearningAndDevelopment.Repository;



import com.example.LearningAndDevelopment.Model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long>{
    Manager findByUsername(String username);
}
