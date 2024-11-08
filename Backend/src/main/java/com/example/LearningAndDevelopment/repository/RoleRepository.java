package com.example.LearningAndDevelopment.repository;



import java.util.Optional;

import com.example.LearningAndDevelopment.model.Role;
import com.example.LearningAndDevelopment.model.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

