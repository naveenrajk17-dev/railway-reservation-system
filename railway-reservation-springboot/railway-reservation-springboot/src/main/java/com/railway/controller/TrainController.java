package com.railway.controller;

import com.railway.entity.Train;
import com.railway.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trains") // Base URL is http://localhost:8080/trains
public class TrainController {

    @Autowired
    private TrainService trainService;

    @PostMapping
    public Train addTrain(@RequestBody Train train) {
        return trainService.saveTrain(train);
    }

    @GetMapping
    public List<Train> getAllTrains() {
        return trainService.getAllTrains();
    }

    // Advanced Feature: Search Trains
    // URL will look like:
    // http://localhost:8081/trains/search?source=Chennai&destination=Bangalore
    @GetMapping("/search")
    public List<Train> searchTrains(@RequestParam String source, @RequestParam String destination) {
        return trainService.searchTrains(source, destination);
    }

}
