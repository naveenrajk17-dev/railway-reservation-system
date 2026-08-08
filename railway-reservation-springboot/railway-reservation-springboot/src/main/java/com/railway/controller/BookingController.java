package com.railway.controller;

import com.railway.entity.Booking;
import com.railway.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings") // Base URL is http://localhost:8080/bookings
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> bookTicket(@RequestBody Booking booking) {
        try {
            Booking saved = bookingService.saveBooking(booking);
            return ResponseEntity.ok(saved);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // URL will look like: http://localhost:8081/bookings/pnr/PNR326132
    @GetMapping("/pnr/{pnrNumber}")
    public Booking getBookingByPnr(@PathVariable String pnrNumber) {
        return bookingService.getBookingByPnr(pnrNumber);
    }

    // URL: PUT http://localhost:8081/bookings/cancel/PNR326132
    @PutMapping("/cancel/{pnrNumber}")
    public Booking cancelBooking(@PathVariable String pnrNumber) {
        return bookingService.cancelBooking(pnrNumber);
    }

    // URL: http://localhost:8081/bookings/user/1 (1 = the userId)
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable int userId) {
        return bookingService.getBookingsByUser(userId);
    }

}
