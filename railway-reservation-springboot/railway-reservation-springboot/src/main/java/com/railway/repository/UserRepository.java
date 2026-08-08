package com.railway.repository;

import com.railway.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Spring Boot automatically gives us save(), findById(), findAll(),
    // deleteById(), etc.
    // So we don't need to write ANY code here for basic operations!

    User findByEmail(String email);

}
