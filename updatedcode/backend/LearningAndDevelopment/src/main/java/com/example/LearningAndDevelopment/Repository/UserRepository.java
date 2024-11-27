package com.example.LearningAndDevelopment.Repository;

import com.example.LearningAndDevelopment.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
}