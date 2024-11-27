package com.example.LearningAndDevelopment.Service;


import com.example.LearningAndDevelopment.Model.UserPrincipal;
import com.example.LearningAndDevelopment.Model.Users;
import com.example.LearningAndDevelopment.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> userOpt = userRepository.findByUsername(username);

        if(userOpt == null){
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("User not found");
        }
        Users user = userOpt.get();
        return new UserPrincipal(user);
    }
}