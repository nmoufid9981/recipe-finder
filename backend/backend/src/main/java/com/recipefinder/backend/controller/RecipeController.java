package com.recipefinder.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.service.RecipeService;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:5173") // React
public class RecipeController {

    @Autowired
    private RecipeService service;

    @GetMapping
    public List<Recipe> getAll() {
        return service.getAllRecipes();
    }

    @PostMapping("/search")
    public List<Map<String, Object>> search(@RequestBody List<String> ingredients) {
        return service.findRecipesByIngredients(ingredients);
    }
}