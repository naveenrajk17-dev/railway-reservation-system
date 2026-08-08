package com.railway.service;

import com.railway.entity.User;
import com.railway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    // Injecting the Repository we just created!
    @Autowired
    private UserRepository userRepository;

    // Save a new User
    public User saveUser(User user) {
        return userRepository.save(user); // Uses Spring Data JPA magic
    }

    // Get all Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get User by ID
    public User getUserById(int id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null); // Returns user if found, or null if not found
    }

    // Delete User by ID
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
