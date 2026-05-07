package com.recipefinder.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.service.RecipeService;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    @Autowired
    private RecipeService service;

    @GetMapping("/debug/db")
    public ResponseEntity<String> debugDb() {
        return ResponseEntity.ok(
            "Recipes count: " + service.getAllRecipes().size()
        );
    }
    // 📦 GET ALL RECIPES
    @GetMapping
    public List<Recipe> getAll() {
        return service.getAllRecipes();
    }

    // 🔍 SEARCH BY INGREDIENTS
    @GetMapping("/search")
    public List<Recipe> search(@RequestParam String ingredients) {

        if (ingredients == null || ingredients.isEmpty()) {
            return List.of();
        }

        List<String> list = Arrays.stream(ingredients.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();

        return service.findRecipesByIngredients(list);
    }

    // 🔥 GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getById(@PathVariable Long id) {
        return service.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}