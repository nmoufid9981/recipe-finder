package com.recipefinder.backend.controller;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.service.RecipeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:3000") // React
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