package com.railway.repository;

import com.railway.entity.Booking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Spring Boot will automatically write a SQL query to find a booking by its
    // PNR!
    Booking findByPnrNumber(String pnrNumber);

    List<Booking> findByUser_UserId(int userId);

    List<Booking> findByTrain_TrainIdAndJourneyDateAndSeatNumberAndStatus(
            int trainId, LocalDate journeyDate, int seatNumber, String status);

}
