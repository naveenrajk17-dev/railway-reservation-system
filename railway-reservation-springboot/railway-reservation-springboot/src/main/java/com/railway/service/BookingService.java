package com.railway.service;

import com.railway.entity.Booking;
import com.railway.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Advanced Feature: Book a Ticket with auto-generated PNR also based on ticket
    // availability
    public Booking saveBooking(Booking booking) {

        List<Booking> conflicting = bookingRepository.findByTrain_TrainIdAndJourneyDateAndSeatNumberAndStatus(
                booking.getTrain().getTrainId(),
                booking.getJourneyDate(),
                booking.getSeatNumber(),
                "BOOKED");

        if (!conflicting.isEmpty()) {
            throw new IllegalStateException(
                    "Seat " + booking.getSeatNumber() + " is already booked for this train on this date.");
        }

        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000);
        booking.setPnrNumber("PNR" + randomNumber);

        booking.setStatus("BOOKED");

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Advanced Feature: Fetch by PNR
    public Booking getBookingByPnr(String pnrNumber) {
        return bookingRepository.findByPnrNumber(pnrNumber);
    }

    // Advanced Feature: Cancel a Ticket (by PNR)
    public Booking cancelBooking(String pnrNumber) {
        Booking booking = bookingRepository.findByPnrNumber(pnrNumber);
        if (booking == null) {
            return null; // No booking found with this PNR
        }
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }

    // Advanced Feature: Get all bookings for a specific user
    public List<Booking> getBookingsByUser(int userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

}
