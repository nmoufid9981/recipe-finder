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

    // 📦 GET ALL RECIPES
    @GetMapping
    public List<Recipe> getAll() {
        return service.getAllRecipes();
    }

    // 🔍 SEARCH BY INGREDIENTS
    @GetMapping("/search")
    public List<Recipe> search(@RequestParam String ingredients) {

        List<String> list = Arrays.asList(ingredients.split(","));

        return service.findRecipesByIngredients(list);
    }

    // 🔥 GET RECIPE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getById(@PathVariable Long id) {
        return service.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}