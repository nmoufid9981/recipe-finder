package com.recipefinder.backend.controller;

import com.recipefinder.backend.service.MealApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/external/meals")
@CrossOrigin(origins = "*")
public class ExternalMealController {

    @Autowired
    private MealApiService service;

    @GetMapping
    public Object getExternalMeals(@RequestParam String query) {
        return service.searchMeals(query);
    }
}