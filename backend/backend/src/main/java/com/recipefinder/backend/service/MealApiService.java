package com.recipefinder.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MealApiService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Object searchMeals(String query) {
        String url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query;
        return restTemplate.getForObject(url, Object.class);
    }
}