package com.railway.repository;

import com.railway.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainRepository extends JpaRepository<Train, Integer> {

    // Look at this magic! We don't write any SQL.
    // Spring reads "findBy", "Source", "And", "Destination" and creates the query!
    List<Train> findBySourceAndDestination(String source, String destination);

}
