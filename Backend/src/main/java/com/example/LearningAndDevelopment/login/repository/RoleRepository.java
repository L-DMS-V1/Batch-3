package com.example.LearningAndDevelopment.login.repository;



import java.util.Optional;

import com.example.LearningAndDevelopment.login.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(com.example.LearningAndDevelopment.login.model.ERole name);
}

