package com.railway.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate; // Make sure to import this for the Date!

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    @Column(name = "pnr_number")
    private String pnrNumber;

    @Column(name = "journey_date")
    private LocalDate journeyDate;

    @Column(name = "seat_number")
    private int seatNumber;

    @Column(name = "status")
    private String status; // For example: "BOOKED", "CANCELLED"

    // Relationship: Many Bookings can belong to One User
    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;

    // Relationship: Many Bookings can belong to One Train
    @ManyToOne
    @JoinColumn(name = "train_train_id")
    private Train train;
}
